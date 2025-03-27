"use client";

import {useSelector, useDispatch} from "react-redux";
import {RootState} from "@/redux/store";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/redux/cart/cartSlice";
import {useEffect, useState} from "react";
import styles from "./CartModal.module.css";
import Image from "next/image";

export default function CartModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const [isRendered, setIsRendered] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setShow(true));
      });
    } else {
      setShow(false);
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!show) {
      setIsRendered(false);
    }
  };

  if (!isRendered) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.modal}>
      <div
        className={`${styles.modalContent} ${show ? styles.open : ""}`}
        onTransitionEnd={handleTransitionEnd}
      >
        <button onClick={closeModal} className={styles.closeButton}>
          X
        </button>
        <h2 className={styles.title}>Koszyk</h2>

        {cartItems.length === 0 ? (
          <p className={styles.empty}>Koszyk jest pusty</p>
        ) : (
          <>
            <ul className={styles.items}>
              {cartItems.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.image}
                      width={50}
                      height={50}
                      alt={item.name}
                      className={styles.thumb}
                    />
                  </div>

                  <div className={styles.detailsWrapper}>
                    <div className={styles.topRow}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemPrice}>
                        {" "}
                        {item.quantity * item.price} zł
                      </span>
                    </div>

                    <div className={styles.bottomRow}>
                      <div className={styles.quantityControls}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => dispatch(decrementQuantity(item.id))}
                        >
                          −
                        </button>
                        <span className={styles.qtyValue}>{item.quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => dispatch(incrementQuantity(item.id))}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => dispatch(removeFromCart(item.id))}
                        title="Usuń z koszyka"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <p>Suma: {total} zł</p>
              <button className={styles.checkout}>Do kasy</button>
              <button
                className={styles.clear}
                onClick={() => dispatch(clearCart())}
              >
                Wyczyść koszyk
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
