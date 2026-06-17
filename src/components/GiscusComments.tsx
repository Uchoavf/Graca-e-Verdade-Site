'use client';

import { useEffect, useRef } from 'react';

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.setAttribute('data-repo', 'Uchoavf/Graca-e-Verdade-Site');
    script.setAttribute('data-repo-id', 'R_kgDOS8X6hA');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOS8X6hM4C_TQN');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'pt');
    script.setAttribute('data-loading', 'lazy');

    if (ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(script);
    }
  }, []);

  return (
    <section className="border-t border-border pt-14 mt-20" ref={ref}>
      <div className="h-24 flex items-center justify-center text-sm text-muted-foreground animate-pulse">
        Carregando comentários...
      </div>
    </section>
  );
}
