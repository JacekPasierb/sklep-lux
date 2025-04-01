"use client";

import {useSelector, useDispatch} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useUser} from "../../hooks/useUser";
import {clearCart} from "@/redux/cart/cartSlice";
import {selectCartItems} from "../../redux/cart/selectors";
import styles from "./CartModal.module.css";
import Cart from "./steps/Cart";

interface CartModalProps {
  isOpen: boolean;
  closeModal: () => void;
  forceStep?: "success" | null;
}

const CartModal = ({isOpen, closeModal, forceStep}: CartModalProps) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const {user} = useUser();
  const [isRendered, setIsRendered] = useState(false);
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<"cart" | "form" | "payment" | "success">(
    "cart"
  );
  const [localCartItems, setLocalCartItems] = useState(cartItems);

  const extOrderId = uuidv4();

  const [formData, setFormData] = useState({
    name: "",
    street: "",
    country: "",
    city: "",
    email: "",
    phone: "",
    shipping: "kurier",
    payment: "przelew",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmpty = Object.values(formData).some((val) => !val);
    if (isEmpty) return toast.error("Uzupełnij wszystkie dane");
    setStep("success");
    dispatch(clearCart());
  };

  const handlePay = async () => {
    try {
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          cart: localCartItems,
          formData,
          extOrderId,
          userId: user?._id || null,
        }),
      });

      const data = await response.json();

      if (data.redirectUri) window.location.href = data.redirectUri;
      else toast.error("Nie udało się przekierować do płatności.");
    } catch (error) {
      toast.error("Błąd podczas tworzenia zamówienia.");
      console.error(error);
    }
  };

  const closeEnd = () => {
    closeModal();
    setStep("cart");
    setShow(false);
    dispatch(clearCart());
  };

  useEffect(() => {
    if (forceStep) {
      setStep(forceStep);
    }
  }, [forceStep]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user?._id) {
        try {
          const res = await fetch("/api/user/cart");
          const data = await res.json();
          setLocalCartItems(data.cart);
        } catch (err) {
          console.error("Błąd podczas pobierania koszyka:", err);
          toast.error("Nie udało się załadować koszyka");
        }
      } else {
        setLocalCartItems(cartItems);
      }
    };

    fetchCart();
  }, [user, cartItems]);

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
    if (!show) setIsRendered(false);
  };

  const total = localCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingCost =
    formData.shipping === "kurier"
      ? 20
      : formData.shipping === "paczkomat"
      ? 15
      : 0;

  const finalTotal = total + shippingCost;

  if (!isRendered) return null;

  return (
    <div className={styles.modal}>
      <div
        className={`${styles.modalContent} ${show ? styles.open : ""}`}
        onTransitionEnd={handleTransitionEnd}
      >
        <button onClick={closeModal} className={styles.closeButton}>
          X
        </button>
        <h2 className={styles.title}>
          {step === "cart" && "Koszyk"}
          {step === "form" && "Dane do zamówienia"}
          {step === "payment" && "Podsumowanie"}
        </h2>

        {step === "cart" && (
          <Cart
            localCartItems={localCartItems}
            setStep={setStep}
            total={total}
          />
        )}

        {step === "form" && (
          <form className={styles.form} onSubmit={handleOrderSubmit}>
            <input
              name="name"
              placeholder="Imię i nazwisko"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="street"
              placeholder="Ulica i numer domu"
              value={formData.street}
              onChange={handleChange}
              required
            />
            <input
              name="country"
              placeholder="Kraj"
              value={formData.country}
              onChange={handleChange}
              required
            />
            <input
              name="city"
              placeholder="Miasto"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              placeholder="E-mail"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              placeholder="Numer Telefonu"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <button
              onClick={() => setStep("payment")}
              className={styles.checkout}
            >
              Przejdz do podsumowania
            </button>
            <button
              type="button"
              className={styles.clear}
              onClick={() => setStep("cart")}
            >
              Wróć do koszyka
            </button>
          </form>
        )}

        {step === "payment" && (
          <div className={styles.paymentStep}>
            <div className={styles.shippingWrapper}>
              <h4 className={styles.sectionTitle}>Metoda dostawy</h4>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="shipping"
                  value="kurier"
                  checked={formData.shipping === "kurier"}
                  onChange={handleChange}
                />
                Kurier (+20 zł)
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="shipping"
                  value="paczkomat"
                  checked={formData.shipping === "paczkomat"}
                  onChange={handleChange}
                />
                Paczkomat (+15 zł)
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="shipping"
                  value="odbior"
                  checked={formData.shipping === "odbior"}
                  onChange={handleChange}
                />
                Odbiór osobisty (0 zł)
              </label>
            </div>

            <div className={styles.summary}>
              <p>Suma produktów: {total} zł</p>
              <p>Dostawa: {shippingCost} zł</p>
              <p>
                <strong>Razem: {finalTotal} zł</strong>
              </p>
            </div>

            <button
              type="submit"
              className={styles.checkout}
              onClick={handlePay}
            >
              Zamawiam i płacę
            </button>
            <button
              type="button"
              className={styles.clear}
              onClick={() => setStep("form")}
            >
              Wstecz
            </button>
          </div>
        )}

        {step === "success" && (
          <div className={styles.success}>
            <h3>Dziękujemy za zamówienie! ✨</h3>
            <p>Na podany e-mail zostanie wysłane potwierdzenie.</p>
            <button onClick={closeEnd} className={styles.checkout}>
              Zamknij
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
