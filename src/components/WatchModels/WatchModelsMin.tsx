"use client";

import React from "react";
import styles from "./WatchModelsMin.module.css";
import ProductCard from "../ProductCard/ProductCard";
import {watchesData} from "../../data/watchesData";

const WatchModelsMin = () => {
  return (
    <section id="Products">
      <h2 className={styles.title}>Ekskluzywne zegarki najnowsza kolekcja</h2>
      <div className={styles.productList}>
        {watchesData.map((watch) => (
          <div key={watch.modelName}>
            <ProductCard
              imageSrc={watch.img}
              modelName={watch.modelName}
              modelDetails={watch.details}
              description={watch.description}
              price={watch.price}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WatchModelsMin;
