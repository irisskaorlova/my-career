export default function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    // scroll-mt — отступ сверху, чтобы заголовок не прилипал к краю
    // экрана при переходе по ссылке из навигации.
    <section id={id} className="mt-10 scroll-mt-24 first:mt-0">
      <h2 className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {title}
        <span className="h-px flex-1 bg-line" />
      </h2>
      {children}
    </section>
  );
}
