import Photo from "@/components/Photo";
import { experience } from "@/content/site";

// Пункты навигации. id должны совпадать с id разделов в app/page.tsx.
const navItems = [
  { href: "#about", label: "О себе" },
  { href: "#credentials", label: "Сертификация" },
  { href: "#achievements", label: "Достижения" },
  { href: "#experience", label: "Опыт работы" },
  { href: "#competencies", label: "Компетенции и навыки" },
  { href: "#education", label: "Образование" },
  { href: "#courses", label: "Курсы" },
];

// Собираем меню опыта: подряд идущие должности в одной компании
// объединяются в одну ссылку с общим периодом.
// Норильский 2024–н.в., СИБУР 2023–2024, Газпромнефть НТЦ 2014–2023.
function buildExperienceMenu() {
  const groups: {
    company: string;
    index: number; // к какому блоку ведёт ссылка (первый в группе)
    years: number[];
    present: boolean; // есть ли среди периодов «настоящее время»
  }[] = [];

  experience.forEach((job, i) => {
    const years = (job.period.match(/\d{4}/g) ?? []).map(Number);
    const present = /насто/i.test(job.period);
    const last = groups[groups.length - 1];

    if (last && last.company === job.company) {
      last.years.push(...years);
      last.present = last.present || present;
    } else {
      groups.push({ company: job.company, index: i, years, present });
    }
  });

  return groups.map((g) => {
    const start = Math.min(...g.years);
    const end = g.present ? "н.в." : Math.max(...g.years);

    return {
      company: g.company,
      href: `#job-${g.index}`,
      period:
        g.years.length === 0
          ? ""
          : String(start) === String(end)
            ? String(start)
            : `${start}–${end}`,
    };
  });
}

export default function Sidebar() {
  const experienceMenu = buildExperienceMenu();

  return (
    <aside className="shrink-0 sm:w-48">
      {/* Фото прокручивается вместе со страницей и «уезжает» наверх —
          при прокрутке оно появляется маленьким в верхней полоске
          (см. components/StickyHeader.tsx).
          Размер и поведение при клике — в components/Photo.tsx */}
      <Photo />

      {/* Меню закреплено: остаётся на виду и «едет» вниз при прокрутке.
          top-24 — отступ, чтобы не заезжало под верхнюю полоску. */}
      {/* На телефоне меню скрыто: вертикальный список над именем занимал бы
          пол-экрана. Там страница читается сплошной прокруткой, а контекст
          даёт верхняя липкая полоска. */}
      <nav className="no-print mt-7 hidden sm:sticky sm:top-24 sm:block sm:max-h-[calc(100vh-8rem)] sm:overflow-y-auto">
        <ul className="space-y-3 text-sm">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group flex items-center gap-2.5 text-muted transition-colors hover:text-accent"
              >
                <span className="h-px w-4 bg-line transition-all duration-200 group-hover:w-7 group-hover:bg-accent" />
                {item.label}
              </a>

              {/* Под «Опытом работы» — список работодателей с периодами */}
              {item.href === "#experience" && (
                <ul className="ml-1.5 mt-2.5 space-y-2.5 border-l border-line pl-3.5">
                  {experienceMenu.map((job) => (
                    <li key={job.href}>
                      <a
                        href={job.href}
                        className="block leading-snug transition-colors hover:text-accent"
                      >
                        <span className="block text-[13px] font-medium">
                          {job.company}
                        </span>
                        <span className="block text-[11px] text-muted">
                          {job.period}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
