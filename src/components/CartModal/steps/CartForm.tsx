"use client";

import styles from "../CartModal.module.css";
import BackBtn from "../../Buttons/BackBtn/BackBtn";
import NextBtn from "../../Buttons/NextBtn/NextBtn";

interface FormData {
  name: string;
  street: string;
  country: string;
  city: string;
  email: string;
  phone: string;
  shipping: string;
  payment: string;
}

interface CartFormProps {
  formData: {
    name: string;
    street: string;
    country: string;
    city: string;
    email: string;
    phone: string;
    shipping: string;
    payment: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setStep: React.Dispatch<
    React.SetStateAction<"cart" | "form" | "payment" | "success">
  >;
  handleOrderSubmit: (e: React.FormEvent) => void;
}

const CartForm = ({
  formData,
  setFormData,
  setStep,
  handleOrderSubmit,
}: CartFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  return (
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
      <div className={styles.footer}>
        <NextBtn
          text="Przejdź do podsumowania"
          click={() => setStep("payment")}
          type="button"
        />
        <BackBtn text="Wróć do Koszyka" click={() => setStep("cart")} />
      </div>
    </form>
  );
};

export default CartForm;
