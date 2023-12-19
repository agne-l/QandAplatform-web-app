import React from "react";
import styles from "./LoginModal.module.css";

type LoginModalType = {
  onCancel: () => void;
  text: string;
};

const LoginModal: React.FC<LoginModalType> = ({ onCancel, text }) => {
  return (
    <div className={styles.loginModal}>
      <button onClick={onCancel} className={styles.cancelBtn}>
        X
      </button>
      <div className={styles.msg}>
        <p>You must be logged in to {text}</p>
      </div>
    </div>
  );
};

export default LoginModal;
