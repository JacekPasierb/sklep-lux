// components/AuthModal.tsx

import {useCallback, useEffect, useState} from "react";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import style from "./AuthModal.module.css";
import {useUser} from "../../hooks/useUser";
import UserPanel from "../UserPanel/UserPanel";

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
  const {user} = useUser();

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
        {user && (
          <>
            {" "}
            <div style={{padding: "2rem"}}>
              <UserPanel />
            </div>
          </>
        )}
        {!user && (
          <>
            <h2>{isRegister ? "Utwórz Konto" : "Logowanie"}</h2>
            {/* Formularz rejestracji lub logowania */}
            {isRegister ? (
              <RegisterForm setIsRegister={setIsRegister} />
            ) : (
              <LoginForm />
            )}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className={style.btnRedirect}
            >
              {isRegister ? "Przejdź do logowania" : "Utwórz konto"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
