# Моё резюме-сайт (Next.js + Tailwind)

Персональный сайт-резюме, как в примере DavydenkovM/my-career.
Стек: **Next.js 14** (статический экспорт) + **Tailwind CSS**.
Публикуется **бесплатно** на GitHub Pages по адресу вида
`https://irisskaorlova.github.io/my-career/`.

---

## Что нужно один раз установить

1. **Node.js** (LTS-версия) — https://nodejs.org → скачай и установи.
   Проверка: открой терминал и набери `node -v` — должна показаться версия.
2. **Git** — https://git-scm.com → установи.
3. Аккаунт на **GitHub** — https://github.com (бесплатный).

---

## Шаг 1. Запустить сайт у себя на компьютере

Открой терминал в папке проекта и выполни:

```bash
cd site
npm install      # один раз — скачает зависимости
npm run dev      # запустит сайт
```

Открой в браузере **http://localhost:3000** — увидишь сайт с примерным текстом.
Пока сервер запущен, любые правки в файлах сразу видны в браузере.
Остановить — `Ctrl + C` в терминале.

---

## Шаг 2. Вписать свой текст

Тебе нужен по сути **один файл**: `site/content/site.ts`.
Там понятными блоками лежат: имя, должность, «о себе», опыт работы,
навыки, образование и ссылки. Просто меняй текст в кавычках.

Фото и другие картинки клади в папку `site/public/`
(например `site/public/photo.jpg`).

Ничего в коде компонентов трогать не обязательно.

---

## Шаг 3. Опубликовать на GitHub Pages (бесплатно)

1. Создай на GitHub новый **публичный** репозиторий.
   Удобнее всего назвать его `my-career` (тогда адрес будет
   `https://irisskaorlova.github.io/my-career/`).
   Если назовёшь иначе — впиши это имя в `site/next.config.mjs`,
   строка `const repoName = "my-career";`.

2. Залей проект в репозиторий. В терминале в корне проекта:

   ```bash
   git init
   git add .
   git commit -m "my cv site"
   git branch -M main
   git remote add origin https://github.com/irisskaorlova/my-career.git
   git push -u origin main
   ```

3. На GitHub: репозиторий → **Settings** → слева **Pages** →
   в разделе «Build and deployment» → **Source** выбери
   **GitHub Actions**.

4. Готово. При каждом `git push` в ветку `main` сайт автоматически
   пересобирается и публикуется (это делает файл
   `.github/workflows/deploy.yml`). Через 1–2 минуты сайт будет доступен
   по адресу `https://irisskaorlova.github.io/my-career/`.

Чтобы обновить резюме потом — поправь `site/content/site.ts` и снова:

```bash
git add .
git commit -m "update cv"
git push
```

---

## Структура проекта

```
my-career/
├── .github/workflows/deploy.yml   # автопубликация на GitHub Pages
├── site/                          # сам сайт (Next.js)
│   ├── app/                       # страница и общий каркас
│   ├── components/                # блоки интерфейса (шапка, секции)
│   ├── content/site.ts            # <-- ВЕСЬ ТВОЙ ТЕКСТ ЗДЕСЬ
│   └── public/                    # фото и картинки
└── README.md
```

## Частые вопросы

**Сайт открылся без стилей / картинок не видно.**
Проверь, что `repoName` в `site/next.config.mjs` точно совпадает
с именем репозитория на GitHub.

**Хочу свой домен вместо github.io.**
В Settings → Pages есть поле Custom domain — туда можно вписать
свой домен, если он у тебя есть.

**Как сделать PDF из сайта.**
Открой сайт в браузере и нажми Ctrl/Cmd + P → «Сохранить как PDF».
Стили для печати уже настроены.
