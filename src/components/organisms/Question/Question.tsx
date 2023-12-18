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
  const id = question.id;

  const formattedDate = new Date(question.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className={styles.question}>
      <Link href={`/question/${id}`} className={styles.questionText}>
        {question.question_text}
      </Link>
      <div className={styles.questionDate}>{formattedDate}</div>
    </div>
  );
};

export default Question;
