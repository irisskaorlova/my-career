import BubbleChart from "@/components/BubbleChart";
import ChipCard from "@/components/ChipCard";
import { techStack } from "@/content/site";

export default function TechStack() {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      {/* Распределение по инструментам */}
      <BubbleChart
        items={techStack.split}
        ariaLabel="Распределение по группам инструментов"
      />

      {/* Карточки с конкретными инструментами */}
      <div className="space-y-4">
        {techStack.cards.map((card) => (
          <ChipCard
            key={card.title}
            title={card.title}
            blocks={[{ items: card.items }]}
          />
        ))}
      </div>
    </div>
  );
}
