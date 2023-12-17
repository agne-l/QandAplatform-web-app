import React from "react";
import styles from "./Button.module.css";

type ButtonType = {
  text: string;
  onClick: () => void;
};

const Button: React.FC<ButtonType> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
};

export default Button;
