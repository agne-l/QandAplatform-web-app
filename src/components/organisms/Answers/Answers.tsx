import React from "react";
import styles from "./Answers.module.css";
import Answer from "../Answer/Answer";

type AnswersType = {
  answers: Array<any> | null;
  setShowDeleteAnswerModal: () => void;
  setSelectedAnswerId: (id: string) => void;
  showDeleteAnswerBtn: boolean;
  checkLoggedInStatusForDeleteButton: () => void;
};

const Answers: React.FC<AnswersType> = ({
  answers,
  setShowDeleteAnswerModal,
  setSelectedAnswerId,
  showDeleteAnswerBtn,
  checkLoggedInStatusForDeleteButton,
}) => {
  return (
    <div className={styles.wrapper}>
      {answers &&
        answers.map((answer) => {
          return (
            <div key={answer.id}>
              <Answer
                answer={answer}
                setShowDeleteAnswerModal={setShowDeleteAnswerModal}
                setSelectedAnswerId={(id: string) => setSelectedAnswerId(id)}
                showDeleteAnswerBtn={showDeleteAnswerBtn}
                checkLoggedInStatusForDeleteButton={
                  checkLoggedInStatusForDeleteButton
                }
              />
            </div>
          );
        })}
    </div>
  );
};

export default Answers;
