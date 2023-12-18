import React from "react";
import styles from "./Answer.module.css";

type AnswerType = {
  answer_text: string;
  date: string;
  question_id: string;
};

type AnswerComponentType = {
  answer: AnswerType;
};

const Answer: React.FC<AnswerComponentType> = ({ answer }) => {
  const formattedDate = new Date(answer.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <div className={styles.answer}>
      <div>{answer.answer_text}</div>
      <div className={styles.date}>{formattedDate}</div>
    </div>
  );
};

export default Answer;
