import React from "react";
import styles from "./CtrlBtn.module.css";

interface CtrlBtnProps {
  text: string;
  click: () => void;
}

const CtrlBtn = ({text, click}: CtrlBtnProps) => {
  return (
    <button onClick={click} className={styles.controlBtn}>
      {text}
    </button>
  );
};

export default CtrlBtn;
