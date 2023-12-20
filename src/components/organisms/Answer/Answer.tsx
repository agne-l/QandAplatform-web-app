import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./Answer.module.css";
import Button from "../../atoms/Button/Button";

type AnswerType = {
  answer_text: string;
  date: string;
  question_id: string;
  id: string;
};

type AnswerComponentType = {
  answer: AnswerType;
  setShowDeleteAnswerModal: () => void;
  setSelectedAnswerId: (id: string) => void;
  showDeleteAnswerBtn: boolean;
  checkLoggedInStatusForDeleteButton: () => void;
};

const Answer: React.FC<AnswerComponentType> = ({
  answer,
  setShowDeleteAnswerModal,
  setSelectedAnswerId,
  showDeleteAnswerBtn,
  checkLoggedInStatusForDeleteButton,
}) => {
  const answerId = answer.id;

  const handleClick = (id: string) => {
    setShowDeleteAnswerModal();
    console.log(id);
    setSelectedAnswerId(id);
  };

  useEffect(() => {
    checkLoggedInStatusForDeleteButton();
  }, []);

  const formattedDate = new Date(answer.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <div className={styles.answer}>
      <div className={styles.answerText}>{answer.answer_text}</div>
      <div className={styles.bottomWrapper}>
        <div className={styles.date}>{formattedDate}</div>
        <div className={styles.btnWrapper}>
          {showDeleteAnswerBtn && (
            <Button
              onClick={() => handleClick(answerId)}
              text="Delete Answer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Answer;
