// Диаграмма из кружков: площадь пропорциональна значению.
// Раскладка подобрана под 5 пунктов; первый — самый крупный.

type Item = { label: string; value: number };

// cx/cy — центр кружка, tone — насыщенность заливки,
// light — светлый ли фон (от этого зависит цвет текста внутри).
const layout = [
  { cx: 200, cy: 200, tone: 1, light: false },
  { cx: 292, cy: 118, tone: 0.55, light: true },
  { cx: 112, cy: 282, tone: 0.42, light: true },
  { cx: 104, cy: 112, tone: 0.75, light: false },
  { cx: 300, cy: 292, tone: 0.6, light: true },
];

const radius = (value: number) => Math.sqrt(value) * 13;

// Переносим подпись по словам, чтобы влезала в кружок
function wrapLabel(label: string, maxChars: number): string[] {
  const words = label.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;

    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);

  return lines.slice(0, 3);
}

export default function BubbleChart({
  items,
  ariaLabel,
}: {
  items: Item[];
  ariaLabel: string;
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      /* print:hidden — диаграмма не печатается: на бумаге она съедала
         почти страницу. Убери print:hidden, если хочешь её в PDF. */
      className="h-auto w-full max-w-[380px] print:hidden"
      role="img"
      aria-label={ariaLabel}
    >
      {items.slice(0, layout.length).map((item, i) => {
        const pos = layout[i];
        const r = radius(item.value);
        const color = pos.light ? "var(--text)" : "#fff";

        const lines = wrapLabel(item.label, Math.max(6, Math.round(r / 5.5)));

        // Подгоняем кегль под самую длинную строку, чтобы текст
        // гарантированно влезал в круг (ширина ≈ 0.55 × кегль × символы).
        const longest = Math.max(...lines.map((l) => l.length));
        const pctFont = r * 0.4;
        const labelFont = Math.min(r * 0.2, (r * 1.45) / (longest * 0.55));
        const lineHeight = labelFont * 1.25;

        // Центрируем блок «процент + подпись» по вертикали
        const blockHeight = pctFont * 0.72 + lines.length * lineHeight;
        const pctBaseline = pos.cy - blockHeight / 2 + pctFont * 0.72;

        return (
          <g key={item.label}>
            <circle
              cx={pos.cx}
              cy={pos.cy}
              r={r}
              fill="var(--accent)"
              fillOpacity={pos.tone}
            />
            <text
              x={pos.cx}
              y={pctBaseline}
              textAnchor="middle"
              className="font-semibold"
              fill={color}
              fontSize={pctFont}
            >
              {item.value}%
            </text>
            {lines.map((line, li) => (
              <text
                key={li}
                x={pos.cx}
                y={pctBaseline + (li + 1) * lineHeight}
                textAnchor="middle"
                fill={color}
                fontSize={labelFont}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
