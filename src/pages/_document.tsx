// src/pages/_document.tsx
import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
  return (
    <Html lang="pl">
      <Head>
        <meta
          name="description"
          content="Ekskluzywna kolekcja premium dla wymagających."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
