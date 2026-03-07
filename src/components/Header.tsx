"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="font-display font-bold text-xl text-primary-600">
          Rivoj Logoped
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#xizmatlar" className="text-stone-600 hover:text-primary-600 transition">
            Xizmatlar
          </a>
          <Link href="/instruktorlar" className="text-stone-600 hover:text-primary-600 transition">
            Instruktorlar
          </Link>
          <a href="#yangiliklar" className="text-stone-600 hover:text-primary-600 transition">
            Yangiliklar
          </a>
          <a href="#bog-lanish" className="text-stone-600 hover:text-primary-600 transition">
            Bogʻlanish
          </a>
          <Link
            href="/admin"
            className="text-stone-500 text-sm hover:text-primary-600 transition"
          >
            Admin
          </Link>
        </nav>
        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menyu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-stone-200 bg-white/95 backdrop-blur p-4 flex flex-col gap-3">
          <a href="#xizmatlar" className="py-2" onClick={() => setOpen(false)}>Xizmatlar</a>
          <Link href="/instruktorlar" className="py-2" onClick={() => setOpen(false)}>Instruktorlar</Link>
          <a href="#yangiliklar" className="py-2" onClick={() => setOpen(false)}>Yangiliklar</a>
          <a href="#bog-lanish" className="py-2" onClick={() => setOpen(false)}>Bogʻlanish</a>
          <Link href="/admin" className="py-2 text-primary-600">Admin</Link>
        </div>
      )}
    </header>
  );
}
