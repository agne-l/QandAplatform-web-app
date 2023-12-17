import React, { useState } from "react";
import Link from "next/link";

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
    <Link href={`/question/${question.id}`} className={styles.question}>
      <div className={styles.questionText}>{question.question_text}</div>
      <div className={styles.questionDate}>{question.date}</div>
    </Link>
  );
};

export default Question;
