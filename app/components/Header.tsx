"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "こんな課題", href: "/#solutions" },
  { label: "プロダクト", href: "/#solutions" },
  { label: "私たちについて", href: "/#company" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-200/60 bg-white/80 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span
            className={`text-lg font-bold transition-colors duration-300 ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            FUJIMI DX Lab
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-lg bg-white/90 px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm backdrop-blur transition-all hover:bg-white hover:shadow-md"
          >
            お問い合わせ
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
        >
          <svg
            className={`h-6 w-6 transition-colors ${scrolled ? "text-gray-700" : "text-white"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-gray-100 bg-white/95 px-4 pb-4 backdrop-blur-xl md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-3 text-sm font-medium text-gray-600"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 block rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            お問い合わせ
          </a>
        </nav>
      )}
    </header>
  );
}
