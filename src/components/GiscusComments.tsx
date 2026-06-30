'use client';

import { useEffect, useRef } from 'react';

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    container.innerHTML = '';

    const script = document.createElement('script');
    const scriptAttrs: Record<string, string> = {
      src: 'https://giscus.app/client.js',
      'data-repo': 'Uchoavf/Graca-e-Verdade-Site',
      'data-repo-id': 'R_kgDOS8X6hA',
      'data-category': 'General',
      'data-category-id': 'DIC_kwDOS8X6hM4C_TQN',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': 'preferred_color_scheme',
      'data-lang': 'pt',
      'data-loading': 'lazy',
    };

    Object.entries(scriptAttrs).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });
    script.async = true;
    script.crossOrigin = 'anonymous';

    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <section className="border-t border-border pt-14 mt-20" ref={ref}>
      <div className="h-24 flex items-center justify-center text-sm text-muted-foreground animate-pulse">
        Carregando comentários...
      </div>
    </section>
  );
}
