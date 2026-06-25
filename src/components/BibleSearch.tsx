'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

interface Verse {
  ref: string;
  text: string;
  book: string;
  chapter: number;
  verse: number;
}

type BibleIndex = Record<string, Verse[]>;

function normalizeText(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function parseReference(query: string): {
  book: string;
  chapter?: number;
  verse?: number;
} | null {
  const match = query.trim().match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
  if (!match) return null;
  return {
    book: match[1].trim().toLowerCase(),
    chapter: parseInt(match[2]),
    verse: match[3] ? parseInt(match[3]) : undefined,
  };
}

const BOOK_ALIASES: Record<string, string> = {
  genesis: 'Gênesis', gn: 'Gênesis',
  exodo: 'Êxodo', ex: 'Êxodo',
  levitico: 'Levítico', lv: 'Levítico',
  numeros: 'Números', nm: 'Números',
  deuteronomio: 'Deuteronômio', dt: 'Deuteronômio',
  josue: 'Josué', js: 'Josué',
  juizes: 'Juízes', jz: 'Juízes',
  rute: 'Rute', rt: 'Rute',
  '1 samuel': '1 Samuel', '1sm': '1 Samuel',
  '2 samuel': '2 Samuel', '2sm': '2 Samuel',
  '1 reis': '1 Reis', '1rs': '1 Reis',
  '2 reis': '2 Reis', '2rs': '2 Reis',
  '1 cronicas': '1 Crônicas', '1cr': '1 Crônicas',
  '2 cronicas': '2 Crônicas', '2cr': '2 Crônicas',
  esdras: 'Esdras', ed: 'Esdras',
  neemias: 'Neemias', ne: 'Neemias',
  ester: 'Ester', et: 'Ester',
  jo: 'Jó',
  salmos: 'Salmos', sl: 'Salmos',
  proverbios: 'Provérbios', pv: 'Provérbios',
  eclesiastes: 'Eclesiastes', ec: 'Eclesiastes',
  canticos: 'Cânticos', ct: 'Cânticos',
  isaias: 'Isaías', is: 'Isaías',
  jeremias: 'Jeremias', jr: 'Jeremias',
  lamentacoes: 'Lamentações', lm: 'Lamentações',
  ezequiel: 'Ezequiel', ez: 'Ezequiel',
  daniel: 'Daniel', dn: 'Daniel',
  oseias: 'Oséias', os: 'Oséias',
  joel: 'Joel', jl: 'Joel',
  amos: 'Amós', am: 'Amós',
  obadias: 'Obadias', ob: 'Obadias',
  jonas: 'Jonas', jn: 'Jonas',
  miqueias: 'Miquéias', mq: 'Miquéias',
  naum: 'Naum', na: 'Naum',
  habacuque: 'Habacuque', hc: 'Habacuque',
  sofonias: 'Sofonias', sf: 'Sofonias',
  ageu: 'Ageu', ag: 'Ageu',
  zacarias: 'Zacarias', zc: 'Zacarias',
  malaquias: 'Malaquias', ml: 'Malaquias',
  mateus: 'Mateus', mt: 'Mateus',
  marcos: 'Marcos', mc: 'Marcos',
  lucas: 'Lucas', lc: 'Lucas',
  joao: 'João', joão: 'João',
  atos: 'Atos', at: 'Atos',
  romanos: 'Romanos', rm: 'Romanos',
  '1 corintios': '1 Coríntios', '1co': '1 Coríntios',
  '2 corintios': '2 Coríntios', '2co': '2 Coríntios',
  galatas: 'Gálatas', gl: 'Gálatas',
  efesios: 'Efésios', ef: 'Efésios',
  filipenses: 'Filipenses', fp: 'Filipenses',
  colossenses: 'Colossenses', cl: 'Colossenses',
  '1 tessalonicenses': '1 Tessalonicenses', '1ts': '1 Tessalonicenses',
  '2 tessalonicenses': '2 Tessalonicenses', '2ts': '2 Tessalonicenses',
  '1 timoteo': '1 Timóteo', '1tm': '1 Timóteo',
  '2 timoteo': '2 Timóteo', '2tm': '2 Timóteo',
  tito: 'Tito', tt: 'Tito',
  filemom: 'Filemom', fm: 'Filemom',
  hebreus: 'Hebreus', hb: 'Hebreus',
  tiago: 'Tiago', tg: 'Tiago',
  '1 pedro': '1 Pedro', '1pe': '1 Pedro',
  '2 pedro': '2 Pedro', '2pe': '2 Pedro',
  '1 joao': '1 João', '1jo': '1 João',
  '2 joao': '2 João', '2jo': '2 João',
  '3 joao': '3 João', '3jo': '3 João',
  judas: 'Judas', jd: 'Judas',
  apocalipse: 'Apocalipse', ap: 'Apocalipse',
};

function resolveBook(query: string): string | null {
  const n = normalizeText(query);
  if (BOOK_ALIASES[n]) return BOOK_ALIASES[n];
  for (const [alias, book] of Object.entries(BOOK_ALIASES)) {
    if (normalizeText(alias) === n) return book;
  }
  return null;
}

export default function BibleReader() {
  const [index, setIndex] = useState<BibleIndex | null>(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Navigation state
  const [currentBook, setCurrentBook] = useState('');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [fullTextResults, setFullTextResults] = useState<Verse[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/biblia-index.json')
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setIndex(data as BibleIndex);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const bookNames = useMemo(() => {
    if (!index) return [];
    return Object.keys(index);
  }, [index]);

  const chapters = useMemo(() => {
    if (!index || !currentBook || !index[currentBook]) return 0;
    const verses = index[currentBook];
    return verses[verses.length - 1]?.chapter ?? 0;
  }, [index, currentBook]);

  const chapterVerses = useMemo(() => {
    if (!index || !currentBook) return [];
    return (index[currentBook] ?? []).filter((v) => v.chapter === currentChapter);
  }, [index, currentBook, currentChapter]);

  const navigateTo = useCallback(
    (book: string, chapter: number, verse?: number) => {
      setCurrentBook(book);
      setCurrentChapter(chapter);
      setHighlightedVerse(verse ?? null);
      setShowSearchResults(false);
      if (verse && resultRef.current) {
        setTimeout(() => {
          const el = document.getElementById(`v-${verse}`);
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    },
    []
  );

  const search = useCallback(
    (q: string) => {
      if (!index || !q.trim()) return;

      setLoading(true);
      setShowSearchResults(true);

      const ref = parseReference(q);
      if (ref?.book && ref.chapter) {
        const bookName = resolveBook(ref.book);
        if (bookName && index[bookName]) {
          navigateTo(bookName, ref.chapter, ref.verse);
          setQuery('');
          setLoading(false);
          return;
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

      // Store in temp state for rendering
      setFullTextResults(matches.slice(0, 50));
      setLoading(false);
    },
    [index, navigateTo]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(query);
  };

  const goToChapter = useCallback(() => {
    if (!currentBook) return;
    const ch = currentChapter;
    if (ch < 1 || ch > chapters) return;
    navigateTo(currentBook, ch);
  }, [currentBook, currentChapter, chapters, navigateTo]);

  return (
    <div className="w-full space-y-6">
      {/* Search bar */}
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Buscar... ex: "João 3:16", "Salmos 23" ou "amor graça salvação"'
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

      {/* Full-text search results */}
      {showSearchResults && fullTextResults.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground">
            {fullTextResults.length} resultados para &quot;{query}&quot;
          </p>
          <div className="max-h-[50vh] space-y-1.5 overflow-y-auto rounded-xl">
            {fullTextResults.map((v) => (
              <button
                key={v.ref}
                onClick={() => navigateTo(v.book, v.chapter, v.verse)}
                className="block w-full rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-border-hover"
              >
                <p className="mb-0.5 text-xs font-semibold text-accent">
                  {v.ref}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {v.text}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation controls */}
      {bookNames.length > 0 && (
        <div className="flex flex-wrap items-end gap-2 sm:gap-3 rounded-xl border border-border bg-muted/30 p-3 sm:p-4">
          {/* Book selector */}
          <div className="flex-1 min-w-[140px]">
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Livro
            </label>
            <select
              value={currentBook}
              onChange={(e) => {
                setCurrentBook(e.target.value);
                setCurrentChapter(1);
              }}
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-accent/40 focus:outline-none"
            >
              <option value="">Selecionar...</option>
              {bookNames.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter input */}
          <div className="w-20 sm:w-24">
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Capítulo
            </label>
            <input
              type="number"
              min={1}
              max={chapters || 1}
              value={currentChapter}
              onChange={(e) => setCurrentChapter(parseInt(e.target.value) || 1)}
              disabled={!currentBook}
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground text-center focus:border-accent/40 focus:outline-none disabled:opacity-40"
            />
          </div>

          {/* Go button */}
          <button
            onClick={goToChapter}
            disabled={!currentBook}
            className="rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground hover:opacity-90 transition-all disabled:opacity-50"
          >
            Ir
          </button>

          {/* Prev / Next */}
          <div className="flex gap-1">
            <button
              onClick={() => {
                if (currentBook && currentChapter > 1) {
                  navigateTo(currentBook, currentChapter - 1);
                }
              }}
              disabled={!currentBook || currentChapter <= 1}
              className="rounded-lg border border-border bg-card px-2.5 py-2 text-sm text-muted-foreground hover:bg-muted transition-all disabled:opacity-30"
              title="Capítulo anterior"
            >
              ←
            </button>
            <button
              onClick={() => {
                if (currentBook && currentChapter < chapters) {
                  navigateTo(currentBook, currentChapter + 1);
                }
              }}
              disabled={!currentBook || currentChapter >= chapters}
              className="rounded-lg border border-border bg-card px-2.5 py-2 text-sm text-muted-foreground hover:bg-muted transition-all disabled:opacity-30"
              title="Próximo capítulo"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Chapter content */}
      {chapterVerses.length > 0 && (
        <div
          ref={resultRef}
          className="rounded-2xl border border-border bg-card p-4 sm:p-6"
        >
          <h2 className="mb-1 text-lg font-bold font-serif text-foreground">
            {currentBook} {currentChapter}
          </h2>
          <p className="mb-6 text-xs text-muted-foreground">
            {chapterVerses.length} versículos
          </p>

          <div className="space-y-2.5">
            {chapterVerses.map((v) => (
              <div
                key={v.verse}
                id={`v-${v.verse}`}
                className={`group flex gap-2 sm:gap-3 rounded-lg px-2 sm:px-3 py-1.5 -mx-2 sm:-mx-3 transition-colors ${
                  highlightedVerse === v.verse
                    ? 'bg-accent/10 ring-1 ring-accent/20'
                    : 'hover:bg-muted/50'
                }`}
              >
                <span
                  className={`mt-0.5 select-none text-xs font-semibold tabular-nums ${
                    highlightedVerse === v.verse
                      ? 'text-accent'
                      : 'text-muted-foreground/40'
                  }`}
                >
                  {v.verse}
                </span>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {v.text}
                  <button
                    onClick={() => {
                      const url = new URL(window.location.href);
                      url.hash = '';
                      navigator.clipboard.writeText(
                        `${v.ref} — ${v.text}`
                      );
                    }}
                    className="ml-1.5 inline-flex items-center rounded px-1 py-0.5 text-[10px] text-muted-foreground/30 opacity-0 transition-opacity group-hover:opacity-60 hover:opacity-100 hover:text-accent"
                    title="Copiar versículo"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                  </button>
                </p>
              </div>
            ))}
          </div>

          {/* Bottom prev/next */}
          <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
            <button
              onClick={() => {
                if (currentBook && currentChapter > 1) {
                  navigateTo(currentBook, currentChapter - 1);
                }
              }}
              disabled={!currentBook || currentChapter <= 1}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted transition-all disabled:opacity-30"
            >
              ← Cap. {currentChapter - 1}
            </button>
            <span className="text-xs text-muted-foreground/50">
              {currentBook} {currentChapter}
            </span>
            <button
              onClick={() => {
                if (currentBook && currentChapter < chapters) {
                  navigateTo(currentBook, currentChapter + 1);
                }
              }}
              disabled={!currentBook || currentChapter >= chapters}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted transition-all disabled:opacity-30"
            >
              Cap. {currentChapter + 1} →
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!currentBook && !showSearchResults && bookNames.length > 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-muted/10 p-10 text-center">
          <svg
            className="mx-auto mb-3 h-10 w-10 text-muted-foreground/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
          <p className="text-sm font-medium text-muted-foreground">
            Selecione um livro e capítulo, ou busque um versículo
          </p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Ex: &quot;João 3:16&quot;, &quot;Salmos 23&quot; ou &quot;Gênesis 1&quot;
          </p>
        </div>
      )}
    </div>
  );
}
