import { meta } from "@/content/site";

type Contact = { label: string; text: string; href: string };

// Собираем список контактов: слева метка, справа значение-ссылка.
function buildContacts(): Contact[] {
  const { email, links } = meta;
  const items: Contact[] = [];

  if (links.telegram) {
    const handle = links.telegram.startsWith("@")
      ? links.telegram
      : `@${links.telegram}`;
    items.push({
      label: "Telegram",
      text: handle,
      href: `https://t.me/${handle.slice(1)}`,
    });
  }

  if (email) {
    items.push({ label: "Email", text: email, href: `mailto:${email}` });
  }

  if (links.github) {
    items.push({
      label: "GitHub",
      text: links.github.replace(/^https?:\/\//, ""),
      href: links.github,
    });
  }

  if (links.linkedin) {
    items.push({
      label: "LinkedIn",
      text: links.linkedin.replace(/^https?:\/\//, ""),
      href: links.linkedin,
    });
  }

  if (links.website) {
    items.push({
      label: "Сайт",
      text: links.website.replace(/^https?:\/\//, ""),
      href: links.website,
    });
  }

  return items;
}

export default function Header() {
  const contacts = buildContacts();

  return (
    <header>
      {/* Фото теперь живёт в левой колонке — см. components/Sidebar.tsx */}
      <div className="min-w-0">
        <h1 className="text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.1]">
          {meta.name}
        </h1>
        <p className="mt-2 text-lg font-medium text-accent">{meta.role}</p>
        <p className="mt-1 text-sm text-muted">{meta.location}</p>
      </div>

      {/* Текст «о себе» переехал в отдельный раздел — см. app/page.tsx */}

      {/* Сертификация и языки переехали в раздел — см. app/page.tsx */}

      {/* Контакты: слева метка капслоком, справа кликабельное значение */}
      <dl className="mt-6 space-y-1.5">
        {contacts.map((c) => (
          <div key={c.label} className="flex items-baseline gap-x-5">
            <dt className="w-24 shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {c.label}
            </dt>
            <dd className="min-w-0 break-all">
              <a
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="underline decoration-muted decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {c.text}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
