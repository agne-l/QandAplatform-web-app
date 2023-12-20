import React from "react";
import styles from "./DeleteAnswerModal.module.css";
import Button from "../../atoms/Button/Button";

type DeleteAnswerModalType = {
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteAnswerModal: React.FC<DeleteAnswerModalType> = ({
  onCancel,
  onConfirm,
}) => {
  return (
    <div className={styles.deleteModal}>
      <button onClick={onCancel} className={styles.cancelBtn}>
        X
      </button>
      <div className={styles.msg}>
        Are you sure you want to delete this answer?
      </div>
      <div className={styles.btnWrapper}>
        <Button onClick={onConfirm} text="Confirm" />
        <Button onClick={onCancel} text="Cancel" />
      </div>
    </div>
  );
};

export default DeleteAnswerModal;
