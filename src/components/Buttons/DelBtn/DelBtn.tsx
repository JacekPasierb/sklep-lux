import React from "react";
import styles from "./DelBtn.module.css";

interface DelBtnProps {
  click: () => void;
}

const DelBtn = ({ click}: DelBtnProps) => {
  return (
    <button onClick={click} className={styles.removeBtn} title="Usuń produkt">
      🗑️
    </button>
  );
};

export default DelBtn;
