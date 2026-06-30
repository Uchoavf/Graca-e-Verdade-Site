'use client';

import { useState, useRef, useEffect } from 'react';

export default function AconselhamentoPage() {
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const respostaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resposta && respostaRef.current) {
      respostaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [resposta]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pergunta.trim() || loading) return;

    setLoading(true);
    setError('');
    setResposta('');

    try {
      const res = await fetch('/api/conselho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: pergunta.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao buscar conselho.');
      } else {
        setResposta(data.resposta);
      }
    } catch {
      setError('Erro de conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24">
      <section className="mb-10 sm:mb-14 text-center">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
          Aconselhamento
        </span>
        <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground tracking-tight">
          Aconselhamento Bíblico
        </h1>
        <p className="mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Tire suas dúvidas com base na Palavra de Deus. Todas as respostas são
          fundamentadas exclusivamente nas Escrituras Sagradas.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <label htmlFor="pergunta" className="mb-3 block text-sm font-medium text-foreground font-serif">
            Qual é a sua dúvida?
          </label>
          <textarea
            id="pergunta"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            placeholder='Ex: "Deus existe?", "Como perdoar?", "O que a Bíblia diz sobre ansiedade?"'
            rows={3}
            maxLength={500}
            disabled={loading}
            className="w-full resize-none rounded-xl border border-border bg-muted/30 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent/40 focus:outline-none focus:ring-3 focus:ring-accent/10 transition-all disabled:opacity-50"
          />
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground/60">
              {pergunta.length}/500 caracteres
            </p>
            <button
              type="submit"
              disabled={loading || !pergunta.trim()}
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? 'Buscando...' : 'Buscar conselho'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {resposta && (
        <div
          ref={respostaRef}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8 animate-fade-in"
        >
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </span>
            <h2 className="text-sm font-semibold text-accent font-serif">Conselho Bíblico</h2>
          </div>
          <div className="prose text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
            {resposta}
          </div>
          <p className="mt-5 border-t border-border pt-4 text-[11px] text-muted-foreground/50">
            Resposta gerada com base nas Escrituras Sagradas (ACF). Este é um conselho pastoral automatizado — para questões sérias, procure seu pastor ou líder espiritual.
          </p>
        </div>
      )}

      <div className="mt-16 rounded-2xl border border-border bg-muted/30 p-5 sm:p-6 text-center">
        <h3 className="mb-2 text-sm font-semibold font-serif text-foreground">
          Exemplos de perguntas
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            'Deus existe?',
            'Como perdoar quem me feriu?',
            'O que a Bíblia diz sobre ansiedade?',
            'Qual o propósito da vida?',
            'Como ter mais fé?',
          ].map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => { setPergunta(q); setResposta(''); setError(''); }}
              disabled={loading}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-border-hover transition-colors disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
