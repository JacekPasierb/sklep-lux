// src/components/Hero/Hero.tsx
'use client';

import styles from './Hero.module.css';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className={styles.hero} id='Home'>
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
      <a href='#Products'>
      <motion.button
        className={styles.ctaButton}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Odkryj Kolekcję
      </motion.button></a>
    </section>
  );
};
