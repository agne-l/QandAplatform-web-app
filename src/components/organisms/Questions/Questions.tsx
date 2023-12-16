import React from "react";
import styles from "./Questions.module.css";
import Question from "../Question/Question";

type QuestionsType = {
  questions: Array<any> | null;
};

const Questions: React.FC<QuestionsType> = ({ questions }) => {
  return (
    <div className={styles.wrapper}>
      {questions &&
        questions.map((question) => {
          return (
            <div key={question.id}>
              <Question question={question} />
            </div>
          );
        })}
    </div>
  );
};

export default Questions;
