// src/app/layout.tsx
import "./globals.css";
import type {Metadata} from "next";
import {Geist, Geist_Mono, Playfair_Display} from "next/font/google";

// Fonty
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
});

// Metadata
export const metadata: Metadata = {
  title: "Sklep Luksusowy",
  description: "Ekskluzywna kolekcja premium dla wymagających.",
};

// Layout
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <head></head>
      <body>{children}</body>
    </html>
  );
}
