/**
 * Parse the ACF Bible text file into a searchable JSON index.
 * Run: npx tsx scripts/parse-biblia.ts
 */

import fs from "fs";
import path from "path";

interface Verse {
  ref: string;
  text: string;
  book: string;
  chapter: number;
  verse: number;
}

const BOOK_NAMES_OT = [
  "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio",
  "Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel",
  "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas",
  "Esdras", "Neemias", "Ester", "Jó", "Salmos",
  "Provérbios", "Eclesiastes", "Cânticos", "Isaías", "Jeremias",
  "Lamentações", "Ezequiel", "Daniel", "Oséias", "Joel",
  "Amós", "Obadias", "Jonas", "Miquéias", "Naum",
  "Habacuque", "Sofonias", "Ageu", "Zacarias", "Malaquias",
];

const BOOK_NAMES_NT = [
  "Mateus", "Marcos", "Lucas", "João", "Atos",
  "Romanos", "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios",
  "Filipenses", "Colossenses", "1 Tessalonicenses", "2 Tessalonicenses",
  "1 Timóteo", "2 Timóteo", "Tito", "Filemom", "Hebreus",
  "Tiago", "1 Pedro", "2 Pedro", "1 João", "2 João",
  "3 João", "Judas", "Apocalipse",
];

const ALL_BOOKS = [...BOOK_NAMES_OT, ...BOOK_NAMES_NT];

const HEADER_LINES = [
  "Bíblia Almeida Corrigida Fiel (ACF)",
  "Sociedade Bíblica Trinitariana do Brasil.",
  "Português - All Bible",
  "Almeida Corrigida Fiel (ACF)",
  "VELHO TESTAMENTO",
  "Português",
  "NOVO TESTAMENTO",
  "Old Testament",
  "New Testament",
];

function isPageHeader(line: string): boolean {
  return HEADER_LINES.some((h) => line === h);
}

function isBookChapterLine(line: string): { book: string; chapter: number } | null {
  for (const book of ALL_BOOKS) {
    const regex = new RegExp(`^${book.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} (\\d+)$`);
    const match = line.match(regex);
    if (match) {
      return { book, chapter: parseInt(match[1]) };
    }
  }
  return null;
}

function appearsToBePageNumber(line: string, prevLine: string): boolean {
  if (!/^\d{1,3}$/.test(line)) return false;
  const num = parseInt(line);
  // Pagination headers often appear after "Sociedade Bíblica Trinitariana do Brasil."
  // They are isolated numbers between books/chapters
  // Verse numbers won't appear alone after a page footer
  if (num < 1 || num > 2000) return true;
  return prevLine.includes("Sociedade Bíblica Trinitariana");
}

function isBookNameLine(line: string): string | null {
  // Skip numbers that look like page numbers
  if (/^\d+$/.test(line)) return null;
  return ALL_BOOKS.find((b) => b === line) ?? null;
}

function generateIndex(sourcePath: string, outputPath: string) {
  console.log("Lendo biblia_completa.txt...");
  const raw = fs.readFileSync(sourcePath, "utf-8");
  const lines = raw.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

  const verses: Verse[] = [];
  let currentBook = "";
  let currentChapter = 0;
  let currentVerse = 0;
  let verseTextParts: string[] = [];
  let lastLine = "";

  // Skip the header/index section (everything before the first book chapter)
  let startIdx = 0;
  for (let i = 0; i < lines.length; i++) {
    const bc = isBookChapterLine(lines[i]);
    if (bc && bc.chapter === 1) {
      startIdx = i;
      break;
    }
  }

  function flushVerse() {
    if (verseTextParts.length === 0) return;
    const text = verseTextParts
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length > 0) {
      verses.push({
        ref: `${currentBook} ${currentChapter}:${currentVerse}`,
        text,
        book: currentBook,
        chapter: currentChapter,
        verse: currentVerse,
      });
    }
    verseTextParts = [];
  }

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i];

    // Skip page headers
    if (isPageHeader(line)) {
      lastLine = line;
      continue;
    }

    // Check if it's a book name alone (not chapter)
    if (isBookNameLine(line)) {
      if (isBookChapterLine(line)) {
        // Actually this matches both - let chapter handler deal with it
      } else {
        flushVerse();
        currentBook = line;
        lastLine = line;
        continue;
      }
    }

    // Check for book chapter pattern: "Gênesis 1"
    const bc = isBookChapterLine(line);
    if (bc) {
      flushVerse();
      currentBook = bc.book;
      currentChapter = bc.chapter;
      currentVerse = 0;
      lastLine = line;
      continue;
    }

    // Check for verse number
    if (/^\d{1,3}$/.test(line) && currentBook) {
      const num = parseInt(line);
      // Filter out likely page numbers
      if (appearsToBePageNumber(line, lastLine)) {
        lastLine = line;
        continue;
      }
      // It's a verse number
      flushVerse();
      currentVerse = num;
      lastLine = line;
      continue;
    }

    // Regular text - part of current verse
    if (currentVerse > 0 && currentBook) {
      verseTextParts.push(line);
    }
    lastLine = line;
  }

  // Flush the last verse
  flushVerse();

  // Post-process: filter out verses that look like garbage
  const clean = verses.filter((v) => {
    // Valid verses have references like "Gênesis 1:1"
    if (!v.ref || v.verse < 1) return false;
    // Text should be at least 3 characters
    if (v.text.length < 3) return false;
    return true;
  });

  // Group by book for the index
  const byBook: Record<string, Verse[]> = {};
  for (const v of clean) {
    if (!byBook[v.book]) byBook[v.book] = [];
    byBook[v.book].push(v);
  }

  console.log(`Total de versículos indexados: ${clean.length}`);
  console.log(
    `Livros: ${Object.keys(byBook).length} / ${ALL_BOOKS.length}`
  );

  fs.writeFileSync(outputPath, JSON.stringify(byBook));
  console.log(`Índice salvo em: ${outputPath}`);
}

const sourceFile = process.argv[2] || "/tmp/opencode/artigos-luz-biblia/biblia_completa.txt";
const outputFile = process.argv[3] || path.join(process.cwd(), "public", "biblia-index.json");

generateIndex(sourceFile, outputFile);
