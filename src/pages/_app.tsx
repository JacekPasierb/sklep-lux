// src/pages/_app.tsx
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import ClientProvider from "@/components/ClientProvider";
import {Geist, Geist_Mono, Playfair_Display} from "next/font/google";
import {CartProvider} from "../context/CartContext";

// Czcionki z next/font
const geistSans = Geist({subsets: ["latin"], variable: "--font-geist-sans"});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
});

export default function App({Component, pageProps}: AppProps) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <ClientProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </ClientProvider>
    </div>
  );
}
