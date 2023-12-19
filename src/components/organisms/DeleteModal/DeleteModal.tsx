import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./DeleteModal.module.css";
import Button from "../../atoms/Button/Button";

type DeleteModalType = {
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteModal: React.FC<DeleteModalType> = ({ onCancel, onConfirm }) => {
  return (
    <div className={styles.deleteModal}>
      <button onClick={onCancel} className={styles.cancelBtn}>
        X
      </button>
      <div className={styles.msg}>
        Are you sure you want to delete this question?
      </div>
      <div className={styles.btnWrapper}>
        <Button onClick={onConfirm} text="Confirm" />
        <Button onClick={onCancel} text="Cancel" />
      </div>
    </div>
  );
};

export default DeleteModal;
