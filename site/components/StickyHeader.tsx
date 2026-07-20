"use client";

import { useEffect, useState } from "react";
import { meta } from "@/content/site";

// Префикс нужен, чтобы фото открывалось и локально, и на GitHub Pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// На сколько пикселей нужно прокрутить страницу, чтобы полоска появилась.
const SHOW_AFTER = 220;

export default function StickyHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`no-print fixed inset-x-0 top-0 z-50 border-b border-line backdrop-blur transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      }`}
      style={{ backgroundColor: "color-mix(in srgb, var(--bg) 88%, transparent)" }}
    >
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-2.5 sm:px-8">
        {meta.photo && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`${basePath}${meta.photo}`}
            alt=""
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white"
          />
        )}

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight">
            {meta.name}
          </p>
          <p className="truncate text-xs text-muted">{meta.role}</p>
        </div>

        {/* Кнопка печати. Не нужна — просто удали этот блок. */}
        <button
          type="button"
          onClick={() => window.print()}
          className="ml-auto flex shrink-0 items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-sm transition-colors hover:text-accent"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9V2h12v7" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <path d="M6 14h12v8H6z" />
          </svg>
          <span className="hidden sm:inline">Печать / PDF</span>
        </button>
      </div>
    </div>
  );
}
