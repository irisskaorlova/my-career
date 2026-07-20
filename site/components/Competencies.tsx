import BubbleChart from "@/components/BubbleChart";
import { competencies } from "@/content/site";

export default function Competencies() {
  const { split, levels } = competencies;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      {/* Распределение фокуса */}
      <BubbleChart
        items={split}
        ariaLabel="Распределение фокуса по направлениям"
      />

      {/* Шкалы владения */}
      <div className="space-y-3">
        {levels.map((item) => (
          <div
            key={item.label}
            /* На узком экране точки уходят под подпись, иначе на текст
               оставалось бы всего ~140px и он рвался бы на 5 строк. */
            className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
          >
            <span className="min-w-0 text-[15px] leading-snug">
              {item.label}
            </span>
            <span
              className="flex shrink-0 gap-1 sm:pt-1.5"
              title={`${item.level} из 10`}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  className="h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5"
                  style={{
                    backgroundColor:
                      i < item.level ? "var(--accent)" : "var(--chip)",
                  }}
                />
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
