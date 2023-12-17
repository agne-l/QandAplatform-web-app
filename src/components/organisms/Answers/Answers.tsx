import React from "react";
import styles from "./Answers.module.css";
import Answer from "../Answer/Answer";

type AnswersType = {
  answers: Array<any> | null;
};

const Answers: React.FC<AnswersType> = ({ answers }) => {
  return (
    <div className={styles.wrapper}>
      {answers &&
        answers.map((answer) => {
          return (
            <div key={answer.id}>
              <Answer answer={answer} />
            </div>
          );
        })}
    </div>
  );
};

export default Answers;
