"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SignupFlowButton from "./SignupFlowButton";

const NAV_ITEMS = [
  { label: "ReserveNavi", href: "/lp/reserve-navi" },
  { label: "プロダクト", href: "/#products" },
  { label: "私たちについて", href: "/#about" },
  { label: "コラム", href: "/column" },
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
          ? "border-b border-[#E8E2D9] bg-[#FFFCFA]/90 shadow-sm backdrop-blur-xl"
          : "bg-[#FFFCFA]/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-[#3E362E]">
            FUJIMI <span className="text-[#5A67D8]">DX</span> Lab
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#52483F] transition-colors hover:text-[#F97316]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://lin.ee/UPArZn9"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full border-2 border-[#06C755] bg-white px-4 py-2 text-sm font-bold text-[#06C755] transition-all hover:bg-[#F0FDF4]"
            aria-label="LINEで相談"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.282.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.286-.63-.63V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            LINE
          </a>
          <SignupFlowButton
            label="無料で始める"
            accentColor="#F97316"
            className="rounded-full bg-[#F97316] px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(249,115,22,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#EA580C]"
          />
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
        >
          <svg
            className="h-6 w-6 text-[#3E362E]"
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
      <nav
        className={`overflow-hidden border-t border-[#E8E2D9] bg-[#FFFCFA]/95 px-4 pb-4 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 border-t-0 pb-0 opacity-0"
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block py-3 text-sm font-medium text-[#52483F]"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <SignupFlowButton
          label="無料で始める"
          accentColor="#F97316"
          className="mt-3 block w-full rounded-lg bg-[#F97316] px-5 py-3 text-center text-sm font-bold text-white"
        />
        <a
          href="https://lin.ee/UPArZn9"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center justify-center gap-2 rounded-lg border-2 border-[#06C755] bg-white px-5 py-3 text-center text-sm font-bold text-[#06C755]"
          onClick={() => setOpen(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.282.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.286-.63-.63V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          LINEで相談
        </a>
        <a
          href="#partner"
          className="mt-2 block rounded-lg border border-[#E8E2D9] bg-white px-5 py-3 text-center text-xs font-medium text-[#8A7F74]"
          onClick={() => setOpen(false)}
        >
          共創パートナー募集中
        </a>
      </nav>
    </header>
  );
}
