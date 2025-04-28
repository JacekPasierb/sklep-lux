"use client";

import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import styles from "./DiscountForm.module.css";

const DiscountForm = () => {
  return (
    <section className={styles.discountSection}>
      <div className={styles.formWrapper}>
        <h2 className={styles.formTitle}>Otrzymaj 5% zniżki</h2>
        <p className={styles.formDescription}>
          Za zapis na newsletter otrzymasz 5% zniżki na pierwsze zakupy oraz
          jako pierwszy(a) dowiesz się o nowościach i promocjach.
        </p>

        <Formik
          initialValues={{name: "", email: ""}}
          validationSchema={Yup.object({
            name: Yup.string().required("Imię jest wymagane"),
            email: Yup.string()
              .email("Podaj poprawny adres e-mail")
              .required("E-mail jest wymagany"),
          })}
          onSubmit={(values, {resetForm}) => {
            alert("Formularz wysłany");
            resetForm();
          }}
        >
          {({errors, touched, isSubmitting}) => (
            <Form className={styles.form}>
              <div className={styles.inputGroup}>
                <Field
                  type="text"
                  name="name"
                  placeholder={
                    touched.name && errors.name
                      ? errors.name
                      : "Wprowadź swoje imię"
                  }
                  className={`${styles.inputField} ${
                    errors.name && touched.name ? styles.inputError : ""
                  }`}
                />
              </div>

              <div className={styles.inputGroup}>
                <Field
                  type="email"
                  name="email"
                  placeholder={
                    touched.email && errors.email
                      ? errors.email
                      : "Wprowadź swój e-mail"
                  }
                  className={`${styles.inputField} ${
                    errors.email && touched.email ? styles.inputError : ""
                  }`}
                />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                Zapisz się
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default DiscountForm;
