import React from "react";
import styles from "./NextBtn.module.css";

interface NextBtnProps {
  text: string;
  click: () => void;
  type?: "button" | "reset" | "submit";
}

const NextBtn = ({text, click, type="button"}: NextBtnProps) => {
  return (
    <button onClick={click} className={styles.checkout} type={type}>
      {text}
    </button>
  );
};

export default NextBtn;
