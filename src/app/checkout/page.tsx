"use client";

import styles from "./checkout.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";

import { toast } from "react-toastify";
import { selectCartItems, selectCartTotal } from "../../redux/cart/selectors";
import Image from "next/image";

export default function CheckoutPage() {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.email) {
      toast.error("Uzupełnij wszystkie dane.");
      return;
    }

    // Tu później wyślemy dane do API / Mongo
    console.log("Zamówienie:", {
      produkty: cartItems,
      suma: total,
      dane: formData,
    });

    toast.success("Zamówienie złożone! ✨");
  };

  return (
    <div className={styles.checkoutWrapper}>
      <h1 className={styles.heading}>Podsumowanie zamówienia</h1>

      {cartItems.length === 0 ? (
        <p>Koszyk jest pusty.</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <Image src={item.image} width={50} height={50} alt={item.name} className={styles.thumb}/>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.quantity} × {item.price} zł</p>
                </div>
                <span className={styles.itemTotal}>
                  {item.quantity * item.price} zł
                </span>
              </li>
            ))}
          </ul>

          <p className={styles.total}>Suma: {total} zł</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Imię i nazwisko"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Adres dostawy"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Adres e-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <button type="submit">Zamawiam i płacę</button>
          </form>
        </>
      )}
    </div>
  );
}
