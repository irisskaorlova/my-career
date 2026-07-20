import Credentials from "@/components/Credentials";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import SkillsTabs from "@/components/SkillsTabs";
import Section from "@/components/Section";
import Sidebar from "@/components/Sidebar";
import StickyHeader from "@/components/StickyHeader";
import {
  meta,
  achievements,
  experience,
  education,
  courses,
} from "@/content/site";

export default function Home() {
  return (
    <>
      {/* Верхняя полоска, появляется при прокрутке */}
      <StickyHeader />
      {/* Ширина рабочей области. Шире уже некуда — max-w-7xl последний шаг,
          обратно поуже — max-w-6xl. */}
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-10">
        {/* Левая колонка: фото + навигация, вынесена за белый блок */}
        <Sidebar />

        {/* Правая колонка: шапка на фоне + белый блок с разделами */}
        <div className="min-w-0 flex-1">
          <Header />

          <div className="cv-card mt-8 px-6 py-9 sm:px-9 sm:py-10">
            <Section id="about" title="О себе">
              <p className="text-[15px] leading-relaxed">{meta.about}</p>
            </Section>

            <Section id="credentials" title="Сертификация и языки">
              <Credentials />
            </Section>

            <Section id="achievements" title="Ключевые достижения">
              <ul className="space-y-2 text-[15px] leading-relaxed">
                {achievements.map((a, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="experience" title="Опыт работы">
              <div className="space-y-9">
                {experience.map((job, i) => (
                  /* id нужен для ссылок из бокового меню */
                  <div key={i} id={`job-${i}`} className="scroll-mt-24">
                    {/* Шапка записи: плитка с логотипом слева, текст справа */}
                    <div className="flex gap-4">
                      <Logo src={job.logo} alt={job.company} />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-x-6 sm:flex-row sm:items-baseline sm:justify-between">
                          <h3 className="min-w-0 text-[17px] font-semibold">
                            {job.company}
                          </h3>
                          <span className="shrink-0 whitespace-nowrap text-sm text-muted">
                            {job.period}
                          </span>
                        </div>

                        <p className="mt-0.5 font-medium text-accent">
                          {job.position}
                        </p>
                        {(job.location || job.url) && (
                          <p className="mt-0.5 text-sm text-muted">
                            {job.location}
                            {job.location && job.url && " · "}
                            {job.url && (
                              <a
                                href={job.url}
                                target="_blank"
                                rel="noreferrer"
                                className="underline decoration-muted decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                              >
                                {job.url
                                  .replace(/^https?:\/\//, "")
                                  .replace(/\/$/, "")}
                              </a>
                            )}
                          </p>
                        )}
                      </div>
                    </div>

                    {job.summary && (
                      <p className="mt-3 text-[15px] leading-relaxed">
                        {job.summary}
                      </p>
                    )}

                    {job.groups?.map((g) => (
                      <div key={g.title} className="mt-4">
                        <p className="text-[13px] font-semibold">{g.title}</p>
                        <ul className="mt-1.5 space-y-1.5 text-[15px] leading-relaxed">
                          {g.items.map((item, j) => (
                            <li key={j} className="flex gap-2.5">
                              <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Section>

            <Section id="competencies" title="Компетенции и навыки">
              <SkillsTabs />
            </Section>

            <Section id="education" title="Образование">
              <div className="space-y-4">
                {education.map((e, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-x-6 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="font-medium">{e.place}</p>
                      <p className="text-sm text-muted">{e.degree}</p>
                    </div>
                    <span className="shrink-0 whitespace-nowrap text-sm text-muted">
                      {e.period}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="courses" title="Повышение квалификации, курсы">
              <div className="space-y-4">
                {courses.map((c, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-x-6 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="font-medium">
                        {c.link ? (
                          <a
                            href={c.link}
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-muted decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                          >
                            {c.title}
                          </a>
                        ) : (
                          c.title
                        )}
                      </p>
                      <p className="text-sm text-muted">{c.place}</p>
                    </div>
                    <span className="shrink-0 whitespace-nowrap text-sm text-muted">
                      {c.period}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <footer className="mt-8 text-xs text-muted">
            Сделано на Next.js + Tailwind · опубликовано на GitHub Pages
          </footer>
        </div>
      </div>
    </main>
    </>
  );
}
