"use client";

import React from "react";
import styles from "./WatchModelsMin.module.css";
import ProductCard from "../ProductCard/ProductCard";

const WatchModelsMin = () => {
  return (
    <section id="Prosucts">
      <h2 className={styles.title}>Ekskluzywne zegarki najnowsza kolekcja1</h2>
      <div className={styles.productList}>
        <ProductCard
          imageSrc="/images/watch1.jpg"
          modelName="LuxeNova"
          modelDetails="Skóra naturalna, stal nierdzewna | Czarny | One Size"
          description="Nowoczesny luksus, łączący elegancję z nowatorskim designem."
          price="1999 zł"
        />
        <ProductCard
          imageSrc="/images/watch2.jpg"
          modelName="Prestige"
          modelDetails="Skóra naturalna, stal nierdzewna | Czarny | One Size"
          description="Czysty, klasyczny styl, odpowiedni dla osób, które cenią subtelny luksus."
          price="2999 zł"
        />
        <ProductCard
          imageSrc="/images/watch3.jpg"
          modelName="Titan"
          modelDetails="Skóra naturalna, stal nierdzewna | Czarny | One Size"
          description="Solidny, wytrzymały model, idealny dla osób, które cenią niezawodność."
          price="3999 zł"
        />
      
      </div>
    </section>
  );
};

export default WatchModelsMin;
