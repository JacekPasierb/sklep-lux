import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";

interface FooterProps {
  isSmallMobile: boolean;
}

const Footer: React.FC<FooterProps> = ({isSmallMobile}) => {
  return (
    <div className={styles.footerSection}>
      {isSmallMobile && (
        <div className={styles.box}>
          <p className={styles.logo}>WATCH</p>
        </div>
      )}
      <div className={styles.imageWrapper}>
        {" "}
        <Image
          src="/images/watch4.png"
          alt="Ekskluzywny zegarek"
          width={160}
          height={120}
          className={styles.image}
        />
      </div>
      {!isSmallMobile && (
        <div className={styles.box}>
          <p className={styles.logo}>WATCH</p>
          <div className={styles.line}></div>
        </div>
      )}

      <div className={styles.textWrapper}>
        <p>
          Zegarki, które wyznaczają nowe standardy elegancji i precyzji.
          <br />
          Innowacyjne mechanizmy oraz ponadczasowy design sprawiają, że każdy
          model jest wyjątkowy.
        </p>
        <p>
          {" "}
          <u>Design i model by</u> Jacek <br /> <u>3D i animacja by</u> JP Web
          Solutions
        </p>
      </div>
    </div>
  );
};

export default Footer;
