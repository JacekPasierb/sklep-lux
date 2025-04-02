"use client";

import styles from "../CartModal.module.css";
import NextBtn from "../../Buttons/NextBtn/NextBtn";
import BackBtn from "../../Buttons/BackBtn/BackBtn";

interface CartPaymentProps {
  formData: {
    shipping: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  total: number;
  finalTotal: number;
  shippingCost: number;
  handlePay: () => void;
  setStep: React.Dispatch<
    React.SetStateAction<"cart" | "form" | "payment" | "success">
  >;
}

const CartPayment = ({
  formData,
  handleChange,
  total,
  finalTotal,
  shippingCost,
  handlePay,
  setStep,
}: CartPaymentProps) => {
  return (
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

      <NextBtn text="Zamawiam i płacę" click={handlePay} type="submit" />
      <BackBtn text="Wstecz" click={() => setStep("form")} />
    </div>
  );
};

export default CartPayment;
