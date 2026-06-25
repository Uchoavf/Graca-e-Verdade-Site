'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface Verse {
  ref: string;
  text: string;
  book: string;
  chapter: number;
  verse: number;
}

type BibleIndex = Record<string, Verse[]>;

function normalizeText(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function parseReference(query: string): { book: string; chapter?: number; verse?: number } | null {
  const cleaned = query.trim();
  // Match patterns like: "João 3:16", "João 3", "Gênesis 1:1"
  const match = cleaned.match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
  if (!match) return null;
  const rawBook = match[1].trim().toLowerCase();
  const chapter = parseInt(match[2]);
  const verse = match[3] ? parseInt(match[3]) : undefined;
  return { book: rawBook, chapter: isNaN(chapter) ? undefined : chapter, verse };
}

const BOOK_ALIASES: Record<string, string> = {
  'genesis': 'Gênesis', 'gn': 'Gênesis',
  'exodo': 'Êxodo', 'ex': 'Êxodo',
  'levitico': 'Levítico', 'lv': 'Levítico',
  'numeros': 'Números', 'nm': 'Números',
  'deuteronomio': 'Deuteronômio', 'dt': 'Deuteronômio',
  'josue': 'Josué', 'js': 'Josué',
  'juizes': 'Juízes', 'jz': 'Juízes',
  'rute': 'Rute', 'rt': 'Rute',
  '1 samuel': '1 Samuel', '1sm': '1 Samuel',
  '2 samuel': '2 Samuel', '2sm': '2 Samuel',
  '1 reis': '1 Reis', '1rs': '1 Reis',
  '2 reis': '2 Reis', '2rs': '2 Reis',
  '1 cronicas': '1 Crônicas', '1cr': '1 Crônicas',
  '2 cronicas': '2 Crônicas', '2cr': '2 Crônicas',
  'esdras': 'Esdras', 'ed': 'Esdras',
  'neemias': 'Neemias', 'ne': 'Neemias',
  'ester': 'Ester', 'et': 'Ester',
  'jo': 'Jó',
  'salmos': 'Salmos', 'sl': 'Salmos',
  'proverbios': 'Provérbios', 'pv': 'Provérbios',
  'eclesiastes': 'Eclesiastes', 'ec': 'Eclesiastes',
  'canticos': 'Cânticos', 'ct': 'Cânticos',
  'isaias': 'Isaías', 'is': 'Isaías',
  'jeremias': 'Jeremias', 'jr': 'Jeremias',
  'lamentacoes': 'Lamentações', 'lm': 'Lamentações',
  'ezequiel': 'Ezequiel', 'ez': 'Ezequiel',
  'daniel': 'Daniel', 'dn': 'Daniel',
  'oseias': 'Oséias', 'os': 'Oséias',
  'joel': 'Joel', 'jl': 'Joel',
  'amos': 'Amós', 'am': 'Amós',
  'obadias': 'Obadias', 'ob': 'Obadias',
  'jonas': 'Jonas', 'jn': 'Jonas',
  'miqueias': 'Miquéias', 'mq': 'Miquéias',
  'naum': 'Naum', 'na': 'Naum',
  'habacuque': 'Habacuque', 'hc': 'Habacuque',
  'sofonias': 'Sofonias', 'sf': 'Sofonias',
  'ageu': 'Ageu', 'ag': 'Ageu',
  'zacarias': 'Zacarias', 'zc': 'Zacarias',
  'malaquias': 'Malaquias', 'ml': 'Malaquias',
  'mateus': 'Mateus', 'mt': 'Mateus',
  'marcos': 'Marcos', 'mc': 'Marcos',
  'lucas': 'Lucas', 'lc': 'Lucas',
  'joao': 'João', 'joão': 'João',
  'atos': 'Atos', 'at': 'Atos',
  'romanos': 'Romanos', 'rm': 'Romanos',
  '1 corintios': '1 Coríntios', '1co': '1 Coríntios',
  '2 corintios': '2 Coríntios', '2co': '2 Coríntios',
  'galatas': 'Gálatas', 'gl': 'Gálatas',
  'efesios': 'Efésios', 'ef': 'Efésios',
  'filipenses': 'Filipenses', 'fp': 'Filipenses',
  'colossenses': 'Colossenses', 'cl': 'Colossenses',
  '1 tessalonicenses': '1 Tessalonicenses', '1ts': '1 Tessalonicenses',
  '2 tessalonicenses': '2 Tessalonicenses', '2ts': '2 Tessalonicenses',
  '1 timoteo': '1 Timóteo', '1tm': '1 Timóteo',
  '2 timoteo': '2 Timóteo', '2tm': '2 Timóteo',
  'tito': 'Tito', 'tt': 'Tito',
  'filemom': 'Filemom', 'fm': 'Filemom',
  'hebreus': 'Hebreus', 'hb': 'Hebreus',
  'tiago': 'Tiago', 'tg': 'Tiago',
  '1 pedro': '1 Pedro', '1pe': '1 Pedro',
  '2 pedro': '2 Pedro', '2pe': '2 Pedro',
  '1 joao': '1 João', '1jo': '1 João',
  '2 joao': '2 João', '2jo': '2 João',
  '3 joao': '3 João', '3jo': '3 João',
  'judas': 'Judas', 'jd': 'Judas',
  'apocalipse': 'Apocalipse', 'ap': 'Apocalipse',
};

function resolveBook(query: string): string | null {
  const normalized = normalizeText(query);
  if (BOOK_ALIASES[normalized]) return BOOK_ALIASES[normalized];
  // Try without accents
  for (const [alias, book] of Object.entries(BOOK_ALIASES)) {
    if (normalizeText(alias) === normalized) return book;
  }
  return null;
}

export default function BibleSearch() {
  const [index, setIndex] = useState<BibleIndex | null>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/biblia-index.json')
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setIndex(data);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const search = useCallback(
    (q: string) => {
      if (!index || !q.trim()) {
        setResults([]);
        setSearched(false);
        return;
      }

      setLoading(true);
      setSearched(true);

      // Try exact reference search first
      const ref = parseReference(q);
      if (ref?.book && ref.chapter) {
        const bookName = resolveBook(ref.book);
        if (bookName && index[bookName]) {
          const chapterVerses = index[bookName].filter(
            (v) => v.chapter === ref.chapter
          );
          if (ref.verse) {
            const exact = chapterVerses.filter((v) => v.verse === ref.verse);
            if (exact.length > 0) {
              setResults(exact);
              setLoading(false);
              return;
            }
          }
          if (chapterVerses.length > 0) {
            setResults(chapterVerses.slice(0, 30));
            setLoading(false);
            return;
          }
        }
      }

      // Full-text search
      const normalizedQuery = normalizeText(q);
      const terms = normalizedQuery.split(/\s+/).filter((t) => t.length > 1);

      const matches: Verse[] = [];
      for (const book of Object.keys(index)) {
        for (const verse of index[book]) {
          const normalizedText = normalizeText(verse.text);
          const score = terms.filter((t) => normalizedText.includes(t)).length;
          if (score >= terms.length * 0.5) {
            matches.push(verse);
          }
          if (matches.length >= 50) break;
        }
        if (matches.length >= 50) break;
      }

      setResults(matches.slice(0, 50));
      setLoading(false);
    },
    [index]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(query);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Buscar versículo... ex: "João 3:16" ou "amor"'
            className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-24 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent/40 focus:outline-none focus:ring-3 focus:ring-accent/10 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !index}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? '...' : 'Buscar'}
          </button>
        </div>
      </form>

      {searched && !loading && results.length === 0 && (
        <p className="py-4 text-center text-sm text-muted-foreground">
          Nenhum versículo encontrado. Tente uma referência como &quot;João 3:16&quot; ou um termo de busca.
        </p>
      )}

      {searched && (
        <p className="mb-3 text-xs text-muted-foreground/70">
          {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
        </p>
      )}

      {results.length > 0 && (
        <div className="max-h-[60vh] space-y-2 overflow-y-auto rounded-xl">
          {results.map((verse) => (
            <div
              key={verse.ref}
              className="rounded-lg border border-border bg-card p-3.5 transition-colors hover:border-border-hover animate-fade-in"
            >
              <p className="mb-1 text-xs font-semibold text-accent">{verse.ref}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {verse.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
