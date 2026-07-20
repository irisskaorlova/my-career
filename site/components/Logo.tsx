"use client";

import { useState } from "react";

// Префикс нужен, чтобы картинка открывалась и локально, и на GitHub Pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Логотип в квадратной плитке — как в LinkedIn.
// Плитки одинаковые у всех компаний, поэтому разное соотношение сторон
// (вытянутый СИБУР, компактный Норникель) больше не бросается в глаза.
//
// Размер плитки: h-11 w-11 = 44×44 px. Крупнее — h-12 w-12, мельче — h-10 w-10.
const TILE = "h-11 w-11";

export default function Logo({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return null;

  return (
    <span
      className={`${TILE} flex shrink-0 items-center justify-center rounded-lg border p-1.5`}
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--line)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}${src}`}
        alt={alt}
        onError={() => setFailed(true)}
        className="max-h-full max-w-full object-contain"
      />
    </span>
  );
}
