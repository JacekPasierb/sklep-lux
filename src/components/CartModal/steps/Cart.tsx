import React from "react";
import {CartItem} from "../../../types/cart";
import styles from "./Cart.module.css";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../../redux/cart/cartSlice";

interface CartProps {
  localCartItems: CartItem[];
  setStep: (step: "form") => void;
  total: number;
}

const Cart = ({localCartItems, setStep, total}: CartProps) => {
  const dispatch = useDispatch();

  return (
    <>
      {localCartItems.length === 0 ? (
        <p className={styles.empty}>Koszyk jest pusty</p>
      ) : (
        <>
          <ul className={styles.items}>
            {localCartItems.map((item) => (
              <li key={item.id} className={styles.item}>
                <Image
                  src={item.image}
                  width={50}
                  height={50}
                  className={styles.thumb}
                  alt={item.name}
                />

                <div className={styles.itemDetails}>
                  <div className={styles.topRow}>
                    <strong>{item.name}</strong>
                    <span>{item.price * item.quantity} zł</span>
                  </div>

                  <div className={styles.bottomRow}>
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className={styles.controlBtn}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className={styles.controlBtn}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className={styles.removeBtn}
                      title="Usuń produkt"
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
            <button className={styles.checkout} onClick={() => setStep("form")}>
              Przejdź do kasy
            </button>
            <button
              className={styles.clear}
              onClick={() => dispatch(clearCart())}
            >
              Wyczyść koszyk
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
