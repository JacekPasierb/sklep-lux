// components/AuthModal.tsx

import {useCallback, useEffect, useState} from "react";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import style from "./AuthModal.module.css";

const AuthModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const [isRegister, setIsRegister] = useState(true); // Stan przełączający formularz logowania / rejestracji
  const [show, setShow] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  const escHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);

      // 💡 podwójny requestAnimationFrame, żeby dać czas przeglądarce
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShow(true);
        });
      });

      // 👉 zablokuj scroll
      document.body.style.overflow = "hidden";

      // 👉 nasłuchiwanie ESC
      window.addEventListener("keydown", escHandler);
    } else {
      setShow(false); // animacja wyjścia
      document.body.style.overflow = ""; // przywróć scroll
      window.removeEventListener("keydown", escHandler);
    }
    return () => {
      window.removeEventListener("keydown", escHandler);
      document.body.style.overflow = "";
    };
  }, [isOpen, escHandler]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const handleTransitionEnd = () => {
    if (!show) {
      setIsRendered(false);
    }
  };

  if (!isRendered) return null;

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className={style.modal} onClick={handleBackdropClick}>
      <div
        className={`${style.modalContent} ${show ? style.open : ""}`}
        onTransitionEnd={handleTransitionEnd}
      >
        <button onClick={handleClose} className={style.closeButton}>
          X
        </button>
        <h2>{isRegister ? "Register" : "Login"}</h2>

        {/* Formularz rejestracji lub logowania */}
        {isRegister ? <RegisterForm /> : <LoginForm />}

        <p>
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
