"use client";

import { useEffect, useState } from "react";
import styles from "./WatchModels.module.css";
import Image from "next/image";

export const WatchModels = () => {
  const [activeModel, setActiveModel] = useState("Model 1");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // 50% modelu musi być widoczna, by uznać go za aktywny
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveModel(entry.target.id); // Zmieniamy aktywny model
        }
      });
    }, observerOptions);

    // Obserwowanie wszystkich kart
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card)); // Czyszczenie obserwatora
    };
  }, []);

  return (
    <section className={styles.watchModels}>
      {/* Lewa kolumna: Opis modelu */}
      <div className={styles.description}>
        <h2>Nasze Modele Zegarków</h2>
        <p>
          {/* Wyświetlamy dynamicznie opis na podstawie aktywnego modelu */}
          {activeModel === "Model 1" && (
            <span>Elegancki zegarek z klasycznym mechanizmem.</span>
          )}
          {activeModel === "Model 2" && (
            <span>Nowoczesny zegarek z zaawansowanymi funkcjami.</span>
          )}
          {activeModel === "Model 3" && (
            <span>Sportowy zegarek, odporny na trudne warunki.</span>
          )}
        </p>
      </div>

      {/* Prawa kolumna: Obrazki zegarków */}
      <div className={styles.images}>
        {/* Model 1 */}
        <div className={styles.card} id="Model 1">
          <Image
            src="/images/watch1.jpg"
            alt="Zegarek Model 1"
            width={500}
            height={500}
            className={styles.cardImage}
          />
          <div className={styles.cardText}>Model 1</div>
        </div>

        {/* Model 2 */}
        <div className={styles.card} id="Model 2">
          <Image
            src="/images/watch2.jpg"
            alt="Zegarek Model 2"
            width={500}
            height={500}
            className={styles.cardImage}
          />
          <div className={styles.cardText}>Model 2</div>
        </div>

        {/* Model 3 */}
        <div className={styles.card} id="Model 3">
          <Image
            src="/images/watch3.jpg"
            alt="Zegarek Model 3"
            width={500}
            height={500}
            className={styles.cardImage}
          />
          <div className={styles.cardText}>Model 3</div>
        </div>
      </div>
    </section>
  );
};
