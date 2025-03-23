import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
const Footer = () => {
  return (
    <div className={styles.footerSection}>
        <div className={styles.imageWrapper}>
      <Image
        src="/images/watch4.png"
        alt="Ekskluzywny zegarek"
        width={160}
        height={120}
        className={styles.image}
      /></div>
      <div className={styles.box}>
        <p className={styles.logo}>WATCH</p> <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default Footer;
