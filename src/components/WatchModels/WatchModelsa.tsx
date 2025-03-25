"use client";

import {useEffect, useState, useMemo} from "react";
import styles from "./WatchModelsa.module.css";
import Image from "next/image";
import {useScrollSpy} from "@/hooks/useScrollSpy";

export const WatchModelsa = () => {
  const sectionIds = useMemo(() => ["time1", "time2", "time3"], []);
  const activeId = useScrollSpy(sectionIds);
  const [visible, setVisible] = useState({
    time1: false,
    time2: false,
    time3: false,
  });

  useEffect(() => {
    // Create a new IntersectionObserver instance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            // Set the corresponding section to visible
            setVisible((prev) => ({...prev, [id]: true}));
          } else {
            setVisible((prev) => ({...prev, [id]: false}));
          }
        });
      },
      {
        threshold: 0.6, // Adjust this value for the visibility threshold (e.g., 20% visible)
      }
    );

    // Observe each section
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup the observer when component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return (
    <section className={styles.section} id="Products">
    
      <div className={`${styles.contentWrapper} ${styles.flexDirection}`}>
        <div className={styles.leftWrapper}>
          <div className={styles.stickyContentWrapper}>
          <h2 className={styles.title}>Ekskluzywne zegarki najnowsza kolekcja</h2>
            <div className={styles.stickyNavWrapper}>
              
              <div className={styles.navLine}>
                <div
                  className={`${styles.navLineOrange} ${
                    activeId === "time1" ? styles.navLineActive : ""
                  }`}
                ></div>
                <div
                  className={`${styles.navLineOrange} ${
                    activeId === "time2" ? styles.navLineActive : ""
                  }`}
                ></div>
                <div
                  className={`${styles.navLineOrange} ${
                    activeId === "time3" ? styles.navLineActive : ""
                  }`}
                ></div>
              </div>
              <div className={styles.navLineLinkWrapper}>
                <a
                  href="#time1"
                  className={styles.navLineLink}
                  style={{
                    opacity: activeId === "time1" ? 1 : 0.5,
                  }}
                >
                  <span className={styles.numberMenu}>LuxeNova</span>
                </a>
                <a
                  href="#time2"
                  className={styles.navLineLink}
                  style={{
                    opacity: activeId === "time2" ? 1 : 0.5,
                  }}
                >
                  <span className={styles.numberMenu}>Prestige</span>
                </a>
                <a
                  href="#time3"
                  className={styles.navLineLink}
                  style={{
                    opacity: activeId === "time3" ? 1 : 0.5,
                  }}
                >
                  <span className={styles.numberMenu}>Titan</span>
                </a>
              </div>
            </div>

            {(() => {
              switch (activeId) {
                case "time1":
                  return (
                    <div
                      className={`${styles.contentTitleWrapper} ${styles.z1}`}
                      style={{
                        opacity: activeId === "time1" ? 1 : 1,
                      }}
                    >
                      <div
                        className={`${styles.cardContent} ${
                          visible.time1 ? styles.visible : ""
                        }`}
                      >
                        <p className={styles.paragraph}>
                          Skóra naturalna, stal nierdzewna | Czarny | One Size
                        </p>
                        <p className={styles.paragraphDesc}>
                          Nowoczesny luksus, łączący elegancję z nowatorskim
                          designem.
                        </p>
                        <div
                        className={styles.cardAction}
                         
                        >
                          <div className={styles.price}>1999 zł</div>
                          <button className={styles.egeonCartButton}>
                            <span>Dodaj do koszyka</span>
                            <svg
                              className={styles.arrowIcon}
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                case "time2":
                  return (
                    <div
                      className={`${styles.contentTitleWrapper} ${styles.z1}`}
                      style={{
                        opacity: activeId === "time2" ? 1 : 1,
                      }}
                    >
                      <div
                        className={`${styles.cardContent} ${
                          visible.time2 ? styles.visible : ""
                        }`}
                      >
                        <p className={styles.paragraph}>
                          Skóra naturalna, stal nierdzewna | Czarny | One Size
                        </p>
                        <p className={styles.paragraphDesc}>
                          Czysty, klasyczny styl, odpowiedni dla osób, które
                          cenią subtelny luksus.
                        </p>
                        <div
                           className={styles.cardAction}
                        >
                          <div className={styles.price}>4999 zł</div>
                          <button className={styles.egeonCartButton}>
                            <span>Dodaj do koszyka</span>
                            <svg
                              className={styles.arrowIcon}
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                case "time3":
                  return (
                    <div
                      className={`${styles.contentTitleWrapper} ${styles.z1}`}
                      style={{
                        opacity: activeId === "time3" ? 1 : 1,
                      }}
                    >
                      <div
                        className={`${styles.cardContent} ${
                          visible.time3 ? styles.visible : ""
                        }`}
                      >
                        <p className={styles.paragraph}>
                          Skóra naturalna, stal nierdzewna | Czarny | One Size
                        </p>
                        <p className={styles.paragraphDesc}>
                          Solidny, wytrzymały model, idealny dla osób, które
                          cenią niezawodność.
                        </p>
                        <div
                           className={styles.cardAction}
                        >
                          <div className={styles.price}>6999 zł</div>
                          <button className={styles.egeonCartButton}>
                            <span>Dodaj do koszyka</span>
                            <svg
                              className={styles.arrowIcon}
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                default:
                  return;
              }
            })()}
          </div>
        </div>

        <div className={styles.rightWrapper}>
          <section className={styles.imgWrapper} id="time1">
            <div className={styles.paralaxWrapper}>
              <Image
                src="/images/watch1.jpg"
                alt="Luxury watch model"
                width={500}
                height={500}
                sizes="(max-width: 991px) 100vw, 50vw"
                className={styles.contentImg}
              />
            </div>
          </section>
          <section className={styles.imgWrapper} id="time2">
            <div className={styles.paralaxWrapper}>
              <Image
                src="/images/watch2.jpg"
                alt="Luxury watch model"
                width={500}
                height={500}
                sizes="(max-width: 991px) 100vw, 50vw"
                className={styles.contentImg}
              />
            </div>
          </section>
          <section className={styles.imgWrapper} id="time3">
            <div className={styles.paralaxWrapper}>
              <Image
                src="/images/watch3.jpg"
                alt="Luxury watch model"
                width={500}
                height={500}
                sizes="(max-width: 991px) 100vw, 50vw"
                className={styles.contentImg}
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};
