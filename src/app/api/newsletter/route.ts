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

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Dados inválidos. Envie um JSON com o campo email." },
        { status: 400 }
      );
    }

    const email = body.email;

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }

    if (email.length > 254) {
      return NextResponse.json({ error: "Email muito longo." }, { status: 400 });
    }

    const isNew = await saveSubscriberDev(email.toLowerCase().trim());

    const response = NextResponse.json({
      success: true,
      message: IS_LOCAL && isNew
        ? "Inscrição realizada! Em breve você receberá nossos artigos."
        : "Inscrições em breve disponíveis. Obrigado pelo interesse!",
    });
    response.headers.set("Access-Control-Allow-Origin", "https://graca-e-verdade.vercel.app");
    return response;
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar inscrição. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
