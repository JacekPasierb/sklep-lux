// src/components/Hero/Hero.tsx
'use client';

import styles from './Herob.module.css';
import { motion } from 'framer-motion';

export const Herob = () => {
  return (
    <section className={styles.hero}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Ekskluzywna Kolekcja Premium
      </motion.h1>

      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Wyjątkowe produkty dla ludzi z klasą
      </motion.p>
    </section>
  );
};
