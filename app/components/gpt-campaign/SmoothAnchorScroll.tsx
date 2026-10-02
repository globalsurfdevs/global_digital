'use client';

import { useEffect } from 'react';

/**
 * The original page relied on a global `html { scroll-behavior: smooth }`.
 * That can't be scoped to this page alone (it's a root-element rule), and
 * setting it globally would change scroll behavior across the entire host
 * app. This does the same job for just this campaign's internal `#`
 * links (e.g. "Book a call" → #book) without touching global CSS.
 */
export default function SmoothAnchorScroll() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute('href')?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
