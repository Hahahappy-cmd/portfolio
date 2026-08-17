import type { Metadata } from "next";
import "./globals.css";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description:
    "Portfolio of Happy Prajapati: AI/ML engineer and full-stack developer specializing in computer vision, deep learning pipelines, and production-ready web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
