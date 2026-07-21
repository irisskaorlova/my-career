import { credentials } from "@/content/site";

const icons = {
  // Медаль — для сертификаций
  medal: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </>
  ),
  // Глобус — для языков
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
};

export default function Credentials() {
  return (
    <div className="flex flex-wrap gap-3">
      {credentials.map((c) => {
        const inner = (
          <>
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--chip)" }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent"
                aria-hidden="true"
              >
                {icons[c.icon]}
              </svg>
            </span>

            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-accent">
                {c.label}
              </p>
              <p className="text-[15px] font-semibold leading-tight">
                {c.title}
              </p>
              {c.subtitle && (
                <p className="text-[13px] leading-snug text-muted">
                  {c.subtitle}
                </p>
              )}
            </div>

            {/* Результат отдельной цифрой справа, если он задан */}
            {c.score && (
              <div className="ml-1 shrink-0 border-l border-line pl-3.5 text-center">
                <p className="text-xl font-medium leading-none text-accent">
                  {c.score}
                </p>
                {c.scoreNote && (
                  <p className="mt-1 text-[11px] text-muted">{c.scoreNote}</p>
                )}
              </div>
            )}
          </>
        );

        const cls =
          "flex items-center gap-2.5 rounded-lg border border-line px-3 py-2";

        return c.link ? (
          <a
            key={c.title}
            href={c.link}
            target="_blank"
            rel="noreferrer"
            className={`${cls} transition-colors hover:border-accent`}
          >
            {inner}
          </a>
        ) : (
          <div key={c.title} className={cls}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
