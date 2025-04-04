"use client";

import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useUser} from "../../hooks/useUser";
import {clearCart} from "@/redux/cart/cartSlice";
import styles from "./CartModal.module.css";
import Cart from "./steps/Cart";
import NextBtn from "../Buttons/NextBtn/NextBtn";
import CartForm from "./steps/CartForm";
import CartPayment from "./steps/CartPayment";
import {useCart} from "../../context/CartContext";
import {selectCartItems} from "../../redux/cart/selectors";

interface CartModalProps {
  isOpen: boolean;
  closeModal: () => void;
  forceStep?: "success" | null;
}

const CartModal = ({isOpen, closeModal, forceStep}: CartModalProps) => {
  const [step, setStep] = useState<"cart" | "form" | "payment" | "success">(
    "cart"
  );

  const dispatch = useDispatch();
  const {user} = useUser();
  const [isRendered, setIsRendered] = useState(false);
  const [show, setShow] = useState(false);

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

  const reduxCartItems = useSelector(selectCartItems);
  const {cart, fetchCart} = useCart();

  const products = user?._id ? cart : reduxCartItems;

  const handlePay = async () => {
    try {
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          cart: products,
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

  const closeEnd = async () => {
    closeModal();
    setStep("cart");
    setShow(false);
    if (user?._id) {
      try {
        const res = await fetch("/api/user/cart/clear", {
          method: "DELETE",
        });

        if (!res.ok) throw new Error();
        await fetchCart();
      } catch (err) {
        toast.error("Błąd podczas czyszczenia koszyka");
        console.error(err);
      }
    } else {
      dispatch(clearCart());
    }
  };

  useEffect(() => {
    if (forceStep) {
      setStep(forceStep);
    }
  }, [forceStep]);

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

  const total = products.reduce(
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
          <Cart setStep={setStep} total={total} cartItems={products} />
        )}

        {step === "form" && (
          <CartForm
            formData={formData}
            setFormData={setFormData}
            setStep={setStep}
            handleOrderSubmit={handleOrderSubmit}
          />
        )}

        {step === "payment" && (
          <CartPayment
            formData={formData}
            handleChange={handleChange}
            total={total}
            finalTotal={finalTotal}
            shippingCost={shippingCost}
            handlePay={handlePay}
            setStep={setStep}
          />
        )}

        {step === "success" && (
          <div className={styles.success}>
            <h3>Dziękujemy za zamówienie! ✨</h3>
            <p>Na podany e-mail zostanie wysłane potwierdzenie.</p>
            <NextBtn text={"Zamknij"} click={closeEnd} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
