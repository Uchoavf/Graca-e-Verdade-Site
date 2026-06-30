'use client';

import { useState } from 'react';

const PIX_KEY = '3d67a292-56c0-4b81-8ed3-8c45faddaf09';
const QR_URL = 'https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=00020126580014br.gov.bcb.pix01363d67a292-56c0-4b81-8ed3-8c45faddaf0952040000530398654055802BR5915Gra%C3%A7a%20e%20Verdade6010Ananindeua62070503***6304C083';

export default function ApoiePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 sm:py-24">
      <section className="mb-10 sm:mb-14 text-center">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
          Apoie
        </span>
        <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground tracking-tight">
          Apoie o Projeto
        </h1>
        <p className="mx-auto max-w-lg text-muted-foreground leading-relaxed">
          O Graça & Verdade é mantido sem fins lucrativos. Sua contribuição ajuda a
          cobrir a hospedagem do site e manter os artigos no ar.
        </p>
      </section>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center">
          <div className="mx-auto mb-6 w-fit rounded-2xl border-4 border-accent/20 bg-white p-3">
            <img
              src={QR_URL}
              alt="QR Code PIX — Apoie o Graça e Verdade"
              className="h-56 w-56 sm:h-[280px] sm:w-[280px]"
            />
          </div>

          <p className="mb-2 text-sm font-medium text-foreground">
            Escaneie o QR Code com seu app de banco
          </p>
          <p className="mb-5 text-xs text-muted-foreground">
            ou copie a chave Pix abaixo
          </p>

          <div className="mx-auto flex max-w-sm items-center gap-2">
            <code className="flex-1 truncate rounded-lg border border-border bg-muted px-4 py-3 text-xs text-foreground font-mono">
              {PIX_KEY}
            </code>
            <button
              onClick={handleCopy}
              className="shrink-0 rounded-lg border border-border bg-card px-4 py-3 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
            >
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted/30 p-6 text-center">
          <blockquote className="text-base sm:text-lg italic text-muted-foreground font-serif leading-relaxed">
            &quot;Cada um contribua segundo propôs no seu coração, não com tristeza
            ou por necessidade; porque Deus ama ao que dá com alegria.&quot;
          </blockquote>
          <cite className="mt-3 block text-xs font-medium text-accent not-italic tracking-wide">
            2 Coríntios 9:7
          </cite>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Toda doação é voluntária. O valor sugerido é livre — doe o que seu
            coração desejar. Que Deus te abençoe!
          </p>
        </div>
      </div>
    </div>
  );
}
