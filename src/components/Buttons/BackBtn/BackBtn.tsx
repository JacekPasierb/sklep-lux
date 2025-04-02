import React from "react";
import styles from "./BackBtn.module.css";

interface BackBtnProps {
    text:string;
  click: () => void;
}

const BackBtn = ({text, click}: BackBtnProps) => {
  return (
    <button type="button" className={styles.clear} onClick={click}>
      {text}
    </button>
  );
};

export default BackBtn;
