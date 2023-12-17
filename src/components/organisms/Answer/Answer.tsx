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
  return <div>{answer.answer_text}</div>;
};

export default Answer;
