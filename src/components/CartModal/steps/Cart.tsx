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
import BackBtn from "../../Buttons/BackBtn/BackBtn";
import NextBtn from "../../Buttons/NextBtn/NextBtn";
import CtrlBtn from "../../Buttons/CtrlBtn/CtrlBtn";
import DelBtn from "../../Buttons/DelBtn/DelBtn";
import {toast} from "react-toastify";
import {useUser} from "../../../hooks/useUser";

interface CartProps {
  localCartItems: CartItem[];
  setStep: (step: "form") => void;
  total: number;
  setLocalCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Cart = ({
  localCartItems,
  setStep,
  total,
  setLocalCartItems,
}: CartProps) => {
  const dispatch = useDispatch();
  const {user} = useUser();

  const refreshCartFromDb = async () => {
    try {
      const res = await fetch("/api/user/cart");
      const data = await res.json();
      setLocalCartItems(data.cart);
    } catch (error) {
      toast.error("Nie udało się odświeżyć koszyka");
      console.error("Błąd odświeżania koszyka:", error);
    }
  };

  const handleIncrement = async (id: string) => {
    if (user?._id) {
      try {
        const res = await fetch("/api/user/cart/increment", {
          method: "PATCH",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({productId: id}),
        });

        if (!res.ok) throw new Error();
        await refreshCartFromDb();
      } catch {
        toast.error("Błąd zwiększania ilości");
      }
    } else {
      dispatch(incrementQuantity(id));
    }
  };

  const handleDecrement = async (id: string) => {
    if (user?._id) {
      try {
        const res = await fetch("/api/user/cart/decrement", {
          method: "PATCH",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({productId: id}),
        });

        if (!res.ok) throw new Error();
        await refreshCartFromDb();
      } catch {
        toast.error("Błąd zmniejszania ilości");
      }
    } else {
      dispatch(decrementQuantity(id));
    }
  };

  const handleRemove = async (id: string) => {
    if (user?._id) {
      try {
        const res = await fetch("/api/user/cart/remove", {
          method: "DELETE",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({productId: id}),
        });

        if (!res.ok) throw new Error();
        await refreshCartFromDb();
      } catch {
        toast.error("Błąd usuwania produktu");
      }
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleClearCart = async () => {
    if (user?._id) {
      try {
        const res = await fetch("/api/user/cart/clear", {
          method: "DELETE",
        });

        if (!res.ok) throw new Error();

        await refreshCartFromDb();
      } catch (err) {
        toast.error("Błąd podczas czyszczenia koszyka");
        console.error(err);
      }
    } else {
      dispatch(clearCart());
    }
  };

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
                      <CtrlBtn
                        text={"-"}
                        click={() => handleDecrement(item.id)}
                      />

                      <span>{item.quantity}</span>
                      <CtrlBtn
                        text={"+"}
                        click={() => handleIncrement(item.id)}
                      />
                    </div>
                    <DelBtn click={() => handleRemove(item.id)} />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.footer}>
            <p>Suma: {total} zł</p>

            <NextBtn text={"Przejdź do kasy"} click={() => setStep("form")} />
            <BackBtn text={"Wyczyść koszyk"} click={handleClearCart} />
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
