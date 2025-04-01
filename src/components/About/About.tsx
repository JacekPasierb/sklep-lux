"use client";

import styles from "./About.module.css";
import {motion} from "framer-motion";
import Image from "next/image";

const About = () => {
  return (
    <section className={styles.about} id="About">
      <motion.div
        className={styles.imageContainer}
        initial={{opacity: 0, scale: 0.8}}
        whileInView={{opacity: 1, scale: 1}}
        transition={{duration: 1}}
        viewport={{once: true}}
      >
        <Image
          src="/images/about-image.jpg"
          alt="Zbliżenie na luksusowy zegarek z naszej kolekcji"
          width={500}
          height={500}
          className={styles.image}
        />
      </motion.div>

      <motion.div
        className={styles.textContainer}
        initial={{opacity: 0, x: 50}}
        whileInView={{opacity: 1, x: 0}}
        transition={{duration: 1, delay: 0.2}}
        viewport={{once: true}}
      >
        <h2 className={styles.title}>Czas to luksus, który masz na ręku.</h2>
        <p className={styles.text}>
          Nasze zegarki to nie tylko precyzyjne mechanizmy – to dzieła sztuki,
          które definiują Twój styl. Każdy detal to połączenie elegancji i
          nowoczesności, stworzone dla tych, którzy wiedzą, że czas to coś
          więcej niż liczby na tarczy.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
