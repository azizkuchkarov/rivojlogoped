import type { Metadata } from "next";
import { Outfit, Sora } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Rivoj Logoped | Defektolog, Logoped, Sensor integratsiya, Neyropsixolog, ART terapiya, Intensiv darslar",
  description:
    "Rivoj — Defektolog, logoped, sensor integratsiya, neyropsixolog, bolalar psixologi, ART terapiya, intensiv darslar (ZPRR, RAS), erta rivojlantirish, maktabga tayyorlov, hunar taʼlimi. Har bir yoʻnalishda darslar roʻyxati.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${outfit.variable} ${sora.variable}`}>
      <body className="font-sans min-h-screen">{children}</body>
    </html>
  );
}
