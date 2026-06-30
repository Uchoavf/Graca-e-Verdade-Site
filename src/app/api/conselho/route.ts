import { NextResponse } from "next/server";

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "google/gemini-2.5-flash-lite";

const SYSTEM_PROMPT = `Você é um conselheiro cristão chamado "Graça & Verdade". 

REGRAS OBRIGATÓRIAS:
1. Responda APENAS com conteúdo baseado na Bíblia Sagrada
2. Cite SEMPRE os versículos com livro, capítulo e número
3. Use a versão Almeida Corrigida Fiel (ACF)
4. Seja pastoral, acolhedor e empático
5. Se a pergunta não tiver resposta bíblica direta, diga: "A Bíblia não aborda diretamente essa questão, mas posso compartilhar princípios bíblicos que podem ajudar..."
6. Máximo 350 palavras
7. Termine com uma palavra de esperança ou encorajamento
8. NUNCA invente versículos`;

export async function POST(request: Request) {
  try {
    if (!OPENROUTER_KEY) {
      return NextResponse.json(
        { error: "Serviço de aconselhamento não configurado." },
        { status: 503 }
      );
    }

    const { pergunta } = await request.json();

    if (!pergunta || typeof pergunta !== "string" || pergunta.trim().length < 3) {
      return NextResponse.json(
        { error: "Escreva uma pergunta com pelo menos 3 caracteres." },
        { status: 400 }
      );
    }

    if (pergunta.length > 500) {
      return NextResponse.json(
        { error: "Sua pergunta é muito longa. Tente resumir em até 500 caracteres." },
        { status: 400 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://graca-e-verdade.vercel.app",
        "X-Title": "Graça & Verdade",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: pergunta.trim() },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: "Erro ao processar o conselho. Tente novamente." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const resposta = data.choices?.[0]?.message?.content;

    if (!resposta) {
      return NextResponse.json(
        { error: "Não foi possível gerar uma resposta." },
        { status: 500 }
      );
    }

    return NextResponse.json({ resposta });
  } catch {
    return NextResponse.json(
      { error: "Erro interno. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
