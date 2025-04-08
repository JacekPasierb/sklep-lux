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
        <div className={styles.shipBox} >
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="shipping"
              value="kurier"
              checked={formData.shipping === "kurier"}
              onChange={handleChange}
            />
            Kurier 
          </label>
          <p>20 zł</p>
        </div>
        <div className={styles.shipBox} >
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="shipping"
            value="paczkomat"
            checked={formData.shipping === "paczkomat"}
            onChange={handleChange}
          />
          Paczkomat 
        </label>
        <p>15 zł</p></div>
        <div className={styles.shipBox} >
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="shipping"
            value="odbior"
            checked={formData.shipping === "odbior"}
            onChange={handleChange}
          />
          Odbiór osobisty 
        </label>  <p>0 zł</p></div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerPrice}>
          <p>Suma produktów</p>
          <p> {total.toFixed(2)} zł</p>
        </div>
        <div className={styles.footerPrice}>
          <p>Dostawa</p>
          <p> {shippingCost.toFixed(2)} zł</p>
        </div>
        <div className={styles.footerPrice}>
          <p>Razem</p>
          <p> {finalTotal.toFixed(2)} zł</p>
        </div>

        <>
          <NextBtn text="Zamawiam i płacę" click={handlePay} type="submit" />
          <BackBtn text="Wstecz" click={() => setStep("form")} />
        </>
      </div>
    </div>
  );
};

export default CartPayment;
