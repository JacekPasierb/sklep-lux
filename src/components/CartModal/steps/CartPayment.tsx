import React from 'react'
import styles from "./CartPayment.module.css"

interface CartPaymentProps {
    formData: any;
    total: number;
    shippingCost: number;
    finalTotal: number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePay: () => void;
    setStep: (step: "form") => void;
  }

const CartPayment = ({
    formData,
    total,
    shippingCost,
    finalTotal,
    handleChange,
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

    <button type="submit" className={styles.checkout} onClick={handlePay}>
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
  )
}

export default CartPayment