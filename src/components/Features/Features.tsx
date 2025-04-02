import Image from 'next/image';
import styles from './Features.module.css';

const Features = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.featuresWrapper}>
        <h2 className={styles.featuresTitle}>Dlaczego warto wybrać nasze zegarki?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <Image
              src="/icons/design-icon.png"
              alt="Design"
              className={styles.featureIcon}
              width={50} 
              height={50} 
            />
            <h3>Nowoczesny Design</h3>
            <p>Elegancki, minimalistyczny wygląd, który wyróżnia się na tle innych zegarków.</p>
          </div>
          <div className={styles.featureCard}>
            <Image
              src="/icons/durability-icon.png"
              alt="Durability"
              className={styles.featureIcon}
              width={50} 
              height={50} 
            />
            <h3>Wytrzymałość</h3>
            <p>Nasze zegarki zostały stworzone z najwyższej jakości materiałów, gwarantujących trwałość.</p>
          </div>
          <div className={styles.featureCard}>
            <Image
              src="/icons/technology-icon.png"
              alt="Technology"
              className={styles.featureIcon}
              width={50} 
              height={50} 
            />
            <h3>Nowoczesna Technologia</h3>
            <p>Innowacyjne mechanizmy zegarków zapewniają precyzyjny pomiar czasu oraz wygodę noszenia.</p>
          </div>
          <div className={styles.featureCard}>
            <Image
              src="/icons/waterproof-icon.png"
              alt="Waterproof"
              className={styles.featureIcon}
              width={50} 
              height={50} 
            />
            <h3>Wodoodporność</h3>
            <p>Zegarki zapewniają odporność na wodę i deszcz, co czyni je idealnym wyborem na każdą okazję.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
