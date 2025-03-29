"use client";

import React from "react";
import styles from "./WatchModelsMin.module.css";
import ProductCard from "../ProductCard/ProductCard";

const WatchModelsMin = () => {
  return (
    <section id="Prosucts">
      <h2 className={styles.title}>Ekskluzywne zegarki najnowsza kolekcja</h2>
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
        {/* <div className={styles.productCard}>
          <Image
            src="/images/watch2.jpg"
            alt="Luxury watch model"
            width={500}
            height={500}
            sizes="(max-width: 991px) 100vw, 50vw"
            className={styles.productImage}
          />

          <div className={styles.productDetails}>
            <h3 className={styles.modelName}>model</h3>
            <p className={styles.modelDetails}>
              {" "}
              Skóra naturalna, stal nierdzewna | Czarny | One Size
            </p>
            <p className={styles.productDescription}>
              {" "}
              Solidny, wytrzymały model, idealny dla osób, które cenią
              niezawodność.
            </p>
            <div className={styles.priceAndButton}>
              <span className={styles.price}>6999 zł</span>
              <button className={styles.addToCartButton}>
                Dodaj do koszyka
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default WatchModelsMin;
