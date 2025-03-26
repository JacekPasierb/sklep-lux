"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart, removeFromCart } from "@/redux/cart/cartSlice";
import { useEffect, useState } from "react";
import styles from "./CartModal.module.css";

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

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.modal}>
      <div
        className={`${styles.modalContent} ${show ? styles.open : ""}`}
        onTransitionEnd={handleTransitionEnd}
      >
        <button onClick={closeModal} className={styles.closeButton}>X</button>
        <h2 className={styles.title}>Koszyk</h2>

        {cartItems.length === 0 ? (
          <p className={styles.empty}>Koszyk jest pusty</p>
        ) : (
          <>
            <ul className={styles.items}>
              {cartItems.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.price} zł x {item.quantity}</p>
                  </div>
                  <button onClick={() => dispatch(removeFromCart(item.id))}>🗑️</button>
                </li>
              ))}
            </ul>
            <div className={styles.footer}>
              <p>Suma: {total} zł</p>
              <button className={styles.checkout}>Do kasy</button>
              <button className={styles.clear} onClick={() => dispatch(clearCart())}>Wyczyść koszyk</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
