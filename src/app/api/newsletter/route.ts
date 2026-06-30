import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import fs from "fs";
import path from "path";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_PATH = path.join(process.cwd(), "data", "newsletter.json");

function getSubscribers(): { emails: string[]; subscribedAt: Record<string, string> } {
  try {
    if (!fs.existsSync(STORAGE_PATH)) {
      return { emails: [], subscribedAt: {} };
    }
    const raw = fs.readFileSync(STORAGE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { emails: [], subscribedAt: {} };
  }
}

function saveSubscriber(email: string) {
  const dir = path.dirname(STORAGE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const data = getSubscribers();
  if (data.emails.includes(email)) return false;
  data.emails.push(email);
  data.subscribedAt[email] = new Date().toISOString();
  const tmp = STORAGE_PATH + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, STORAGE_PATH);
  return true;
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const rawIp = forwarded?.split(",")[0]?.trim();
    const ip = rawIp && /^[\d.]+$/.test(rawIp) ? rawIp : "unknown";
    const rateCheck = checkRateLimit(`newsletter:${ip}`);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Muitas tentativas. Aguarde alguns segundos." },
        {
          status: 429,
          headers: rateCheck.retryAfter
            ? { "Retry-After": String(rateCheck.retryAfter) }
            : {},
        }
      );
    }

    const { email } = await request.json();

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }

    if (email.length > 320) {
      return NextResponse.json({ error: "Email muito longo." }, { status: 400 });
    }

    const isNew = saveSubscriber(email.toLowerCase().trim());

    return NextResponse.json({
      success: true,
      message: isNew
        ? "Inscrição realizada com sucesso! Verifique seu e-mail."
        : "Você já está inscrito na nossa newsletter.",
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar inscrição." },
      { status: 500 }
    );
  }
}
