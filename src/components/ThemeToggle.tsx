'use client';

import { useEffect, useState } from 'react';

function getInitialDark(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem('theme');
  if (stored === 'light') return false;
  if (stored === 'dark') return true;
  return matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(getInitialDark);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  const toggle = () => setDark((prev) => !prev);

  return (
    <button
      onClick={toggle}
      className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300"
      aria-label={dark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      title={dark ? 'Tema claro' : 'Tema escuro'}
      suppressHydrationWarning
    >
      <svg
        className="h-[18px] w-[18px]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
        suppressHydrationWarning
      >
        {dark ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        )}
      </svg>
    </button>
  );
}
