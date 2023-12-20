import React from "react";
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
};

const Answer: React.FC<AnswerComponentType> = ({
  answer,
  setShowDeleteAnswerModal,
  setSelectedAnswerId,
}) => {
  const answerId = answer.id;

  const handleClick = (id: string) => {
    setShowDeleteAnswerModal();
    console.log(id);
    setSelectedAnswerId(id);
  };

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
          <Button onClick={() => handleClick(answerId)} text="Delete Answer" />
        </div>
      </div>
    </div>
  );
};

export default Answer;
