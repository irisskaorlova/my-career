import type { Metadata } from "next";
import { meta } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${meta.name} — ${meta.role}`,
  description: meta.about,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
