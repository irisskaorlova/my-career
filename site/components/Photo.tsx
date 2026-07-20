"use client";

import { useState } from "react";
import { meta } from "@/content/site";

// Префикс нужен, чтобы фото открывалось и локально, и на GitHub Pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Во сколько раз увеличивать фото, пока зажата кнопка мыши.
const ZOOM = 2.3;

export default function Photo() {
  const [zoomed, setZoomed] = useState(false);

  if (!meta.photo) return null;

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={`${basePath}${meta.photo}`}
      alt={meta.name}
      draggable={false}
      /* Увеличиваем, пока кнопка зажата; отпустили или увели курсор — вернули */
      onMouseDown={() => setZoomed(true)}
      onMouseUp={() => setZoomed(false)}
      onMouseLeave={() => setZoomed(false)}
      /* То же самое для телефона: долгое касание */
      onTouchStart={() => setZoomed(true)}
      onTouchEnd={() => setZoomed(false)}
      onTouchCancel={() => setZoomed(false)}
      style={{ transform: zoomed ? `scale(${ZOOM})` : "scale(1)" }}
      /* Форма фото: rounded-2xl — скруглённый прямоугольник.
         Квадрат — h-36 w-36. Круг — rounded-full и одинаковые h/w. */
      className={`relative h-44 w-36 origin-top-left select-none rounded-2xl object-cover ring-4 ring-white/80 transition-transform duration-300 ease-out ${
        zoomed
          ? "z-50 cursor-zoom-out shadow-[0_30px_60px_-20px_rgba(69,58,49,0.55)]"
          : "z-0 cursor-zoom-in shadow-[0_10px_30px_-12px_rgba(69,58,49,0.35)]"
      }`}
    />
  );
}
