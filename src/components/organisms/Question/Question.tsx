import React from "react";
import styles from "./Question.module.css";

type QuestionType = {
  question_text: string;
  date: string;
  id: string;
  user_id: string;
};

type QuestionComponentType = {
  question: QuestionType;
};

const Question: React.FC<QuestionComponentType> = ({ question }) => {
  return (
    <div className={styles.question}>
      <div>{question.question_text}</div>
      <div className={styles.questionDate}>{question.date}</div>
    </div>
  );
};

export default Question;
