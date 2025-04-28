"use client";

import {useEffect, useState, useMemo} from "react";
import styles from "./WatchModelsa.module.css";
import Image from "next/image";
import {useScrollSpy} from "@/hooks/useScrollSpy";
import {useUser} from "@/hooks/useUser";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/cart/cartSlice";
import {useCart} from "../../context/CartContext";
import {addProductToCart} from "../../services/cartAPI";
import {watchesData} from "../../data/watchesData";

type SectionId = "time1" | "time2" | "time3";

export const WatchModelsa = () => {
  const sectionIds: SectionId[] = useMemo(
    () => ["time1", "time2", "time3"],
    []
  );

  const activeId = useScrollSpy(sectionIds);
  const [visible, setVisible] = useState({
    time1: false,
    time2: false,
    time3: false,
  });

  const {isLoggedIn} = useUser();
  const dispatch = useDispatch();
  const {fetchCart} = useCart();

  const handleAddToCart = async (product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => {
    if (!isLoggedIn) {
      dispatch(addToCart(product));
      return;
    }

    try {
      await addProductToCart(product);
      await fetchCart();
    } catch {
      toast.error("Błąd przy dodawaniu produktu");
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id as SectionId;
          if (entry.isIntersecting) {
            setVisible((prev) => ({...prev, [id]: true}));
          } else {
            setVisible((prev) => ({...prev, [id]: false}));
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  // Mapa activeId na indeks zegarka w watchesData
  const activeIndex = sectionIds.indexOf(activeId as SectionId);

  const activeWatch = watchesData[activeIndex];

  return (
    <section className={styles.section} id="Products">
      <div style={{maxWidth:"1200px", margin:"4rem auto"}}>
      <div className={`${styles.contentWrapper} ${styles.flexDirection}`}>
        <div className={styles.leftWrapper}>
          <div className={styles.stickyContentWrapper}>
            <h2 className={styles.title}>
              Ekskluzywne zegarki najnowsza kolekcja
            </h2>
            <div className={styles.stickyNavWrapper}>
              <div className={styles.navLine}>
                {sectionIds.map((id) => (
                  <div
                    key={id}
                    className={`${styles.navLineOrange} ${
                      activeId === id ? styles.navLineActive : ""
                    }`}
                  ></div>
                ))}
              </div>
              <div className={styles.navLineLinkWrapper}>
                {watchesData.map((watch, index) => (
                  <a
                    key={watch.modelName}
                    href={`#${sectionIds[index]}`}
                    className={styles.navLineLink}
                    style={{opacity: activeId === sectionIds[index] ? 1 : 0.5}}
                  >
                    <span className={styles.numberMenu}>{watch.modelName}</span>
                  </a>
                ))}
              </div>
            </div>

            {activeWatch && (
              <div
                className={`${styles.contentTitleWrapper} ${styles.z1}`}
                style={{opacity: 1}}
              >
                <div
                  className={`${styles.cardContent} ${
                    visible[sectionIds[activeIndex]] ? styles.visible : ""
                  }`}
                >
                  <p className={styles.paragraph}>{activeWatch.details}</p>
                  <p className={styles.paragraphDesc}>
                    {activeWatch.description}
                  </p>
                  <div className={styles.cardAction}>
                    <div className={styles.price}>{activeWatch.price} zł</div>
                    <button
                      className={styles.egeonCartButton}
                      onClick={() =>
                        handleAddToCart({
                          id: `watch${activeIndex + 1}`,
                          name: activeWatch.modelName,
                          price: Number(activeWatch.price),
                          image: activeWatch.img,
                        })
                      }
                    >
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
                        <polyline points="12 5 19 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.rightWrapper}>
          {watchesData.map((watch, index) => (
            <section
              className={styles.imgWrapper}
              id={sectionIds[index]}
              key={watch.modelName}
            >
              <div className={styles.paralaxWrapper}>
                <Image
                  src={watch.img}
                  alt={watch.modelName}
                  width={500}
                  height={500}
                  sizes="(max-width: 991px) 100vw, 50vw"
                  className={styles.contentImg}
                />
              </div>
            </section>
          ))}
        </div>
      </div></div>
    </section>
  );
};
