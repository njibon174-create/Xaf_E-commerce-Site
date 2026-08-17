"use client";

import { useCart } from "@/lib/store";
import Button from "@/components/ui/Button";

export default function Header() {
  const { setIsOpen } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-obsidian/80 backdrop-blur-xl border-b border-slate/50">
      <div className="mx-auto max-w-md px-4 h-full flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="font-serif text-lg font-medium text-pure tracking-tight">Xaf</span>
        </a>
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate/50 transition-colors"
          aria-label="Open cart"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cloud">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </button>
      </div>
    </header>
  );
}
