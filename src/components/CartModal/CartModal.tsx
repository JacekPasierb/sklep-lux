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
import {createOrder} from "../../services/orderAPI";
import {clearCartAPI} from "../../services/cartAPI";

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

  const handlePay = async () => {
    try {
      const redirectUri = await createOrder(
        products,
        formData,
        extOrderId,
        user?._id || null,
        shippingCost
      );
      window.location.href = redirectUri;
    } catch (error) {
      toast.error(`Błąd podczas tworzenia zamówienia. ${error}`);
      console.error(error);
    }
  };

  const closeEnd = async () => {
    closeModal();
    setStep("cart");
    setShow(false);
    if (user?._id) {
      try {
        await clearCartAPI();
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

  if (!isRendered) return null;

  return (
    <div className={styles.modal}>
      <div
        className={`${styles.modalContent} ${show ? styles.open : ""}`}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className={styles.accountData}><p>Witaj {user ? user.username : "Gościu" }</p></div>
        <button onClick={closeModal} className={styles.closeButton}>
          X
        </button>
        <h2 className={styles.title}>
          {step === "cart" && "Koszyk"}
          {step === "form" && "Dane do zamówienia"}
          {step === "payment" && "Podsumowanie"}
        </h2>
        <div
          style={{width: "100%", height: "5px", backgroundColor: "#c29d5d"}}
        ></div>
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
