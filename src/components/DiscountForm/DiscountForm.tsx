"use client";

import {useState} from "react";
import styles from "./DiscountForm.module.css";

interface FormErrors {
  name?: string;
  email?: string;
}

const DiscountForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const errors: FormErrors = {};
    if (!formData.name) {
      errors.name = "Imię jest wymagane";
    }
    if (!formData.email) {
      errors.email = "E-mail jest wymagany";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Podaj poprawny adres e-mail";
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      alert("Formularz wysłany");
      // Prześlij dane na backend lub do systemu
    }
  };

  return (
    <section className={styles.discountSection}>
      <div className={styles.formWrapper}>
        <h2 className={styles.formTitle}>Otrzymaj 5% zniżki</h2>
        <p className={styles.formDescription}>
          Za zapis na newsletter otrzymasz 5% zniżki na pierwsze zakupy oraz
          jako pierwszy(a) dowiesz się o nowościach i promocjach.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Wprowadź swoje imię"
            value={formData.name}
            onChange={handleChange}
            className={styles.inputField}
          />
          {errors.name && (
            <div className={styles.errorMessage}>{errors.name}</div>
          )}

          <input
            type="email"
            name="email"
            placeholder="Wprowadź swój e-mail"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputField}
          />
          {errors.email && (
            <div className={styles.errorMessage}>{errors.email}</div>
          )}

          <button type="submit" className={styles.submitButton}>
            Zapisz się
          </button>
        </form>
      </div>
    </section>
  );
};

export default DiscountForm;
