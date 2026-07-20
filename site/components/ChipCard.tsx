// Кремовая карточка с белыми «таблетками».
// Используется и в «Навыках», и в «Технологическом стеке».
export default function ChipCard({
  title,
  blocks,
}: {
  title: string;
  blocks: { label?: string; items: string[] }[];
}) {
  return (
    <div className="skill-card p-5">
      <h3 className="font-semibold">{title}</h3>

      {blocks.map((block, i) => (
        <div key={i} className="mt-4">
          {block.label && (
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              {block.label}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {block.items.map((item) => (
              <span key={item} className="chip-light">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
