"use client";

import { useState } from "react";
import ChipCard from "@/components/ChipCard";
import Competencies from "@/components/Competencies";
import TechStack from "@/components/TechStack";
import { skills } from "@/content/site";

const tabs = [
  { id: "competencies", label: "Компетенции" },
  { id: "skills", label: "Навыки" },
  { id: "stack", label: "Технологический стек" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function SkillCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {skills.map((card) => (
        <ChipCard key={card.title} title={card.title} blocks={card.blocks} />
      ))}
    </div>
  );
}

export default function SkillsTabs() {
  const [active, setActive] = useState<TabId>("competencies");

  return (
    <div>
      {/* Переключатель вкладок */}
      <div
        role="tablist"
        aria-label="Компетенции и навыки"
        className="no-print mb-6 inline-flex flex-wrap gap-1 rounded-full p-1"
        style={{ backgroundColor: "var(--chip)" }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
              style={
                isActive
                  ? { backgroundColor: "var(--card)", color: "var(--accent)" }
                  : { color: "var(--muted)" }
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Содержимое активной вкладки */}
      <div key={active} className="fade-in print:hidden">
        {active === "competencies" && <Competencies />}
        {active === "skills" && <SkillCards />}
        {active === "stack" && <TechStack />}
      </div>

      {/* При печати в PDF вкладок нет — показываем всё подряд */}
      <div className="hidden print:block">
        <Competencies />
        <div className="mt-6">
          <SkillCards />
        </div>
        <div className="mt-6">
          <TechStack />
        </div>
      </div>
    </div>
  );
}
