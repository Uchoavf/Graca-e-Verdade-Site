import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IS_LOCAL = process.env.NODE_ENV === "development" || process.env.VERCEL_ENV !== "production";

async function saveSubscriberDev(email: string): Promise<boolean> {
  if (!IS_LOCAL) return false;
  try {
    const fs = await import("fs");
    const path = await import("path");
    const STORAGE_PATH = path.default.join(process.cwd(), "data", "newsletter.json");
    const dir = path.default.dirname(STORAGE_PATH);
    if (!fs.default.existsSync(dir)) fs.default.mkdirSync(dir, { recursive: true });
    let data: { emails: string[]; subscribedAt: Record<string, string> } = { emails: [], subscribedAt: {} };
    if (fs.default.existsSync(STORAGE_PATH)) {
      data = JSON.parse(fs.default.readFileSync(STORAGE_PATH, "utf-8"));
    }
    if (data.emails.includes(email)) return false;
    data.emails.push(email);
    data.subscribedAt[email] = new Date().toISOString();
    const tmp = STORAGE_PATH + ".tmp";
    fs.default.writeFileSync(tmp, JSON.stringify(data, null, 2));
    fs.default.renameSync(tmp, STORAGE_PATH);
    return true;
  } catch {
    return false;
  }
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

    if (email.length > 254) {
      return NextResponse.json({ error: "Email muito longo." }, { status: 400 });
    }

    const isNew = await saveSubscriberDev(email.toLowerCase().trim());

    return NextResponse.json({
      success: true,
      message: isNew
        ? "Inscrição realizada! Em breve você receberá nossos artigos."
        : "Você já está inscrito. Em breve enviaremos novidades!",
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar inscrição. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
