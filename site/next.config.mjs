/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// ВАЖНО: впиши сюда имя своего GitHub-репозитория.
// Если репозиторий называется my-career, сайт будет по адресу
// https://ТВОЙ-ЛОГИН.github.io/my-career/
const repoName = "my-career";

// В продакшене (GitHub Pages) сайт лежит в подпапке /<repo>/, поэтому нужен префикс.
// Локально префикс пустой, чтобы всё открывалось по обычным путям.
const basePath = isProd ? `/${repoName}` : "";

// Нужно, чтобы фото и картинки из папки public/ работали и на GitHub Pages.
process.env.NEXT_PUBLIC_BASE_PATH = basePath;

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  basePath,
  trailingSlash: true,
};

export default nextConfig;
