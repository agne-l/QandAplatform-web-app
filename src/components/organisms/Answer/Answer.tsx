import React from "react";
import axios from "axios";
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
};

const Answer: React.FC<AnswerComponentType> = ({ answer }) => {
  const id = answer.id;

  const deleteAnswer = async () => {
    try {
      const headers = {
        authorization: Cookies.get("jwtToken"),
      };
      const response = await axios.delete(
        `http://localhost:3001/answers/${id}`,
        { headers }
      );

      if (response.status == 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
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
          <Button onClick={deleteAnswer} text="Delete Answer" />
        </div>
      </div>
    </div>
  );
};

export default Answer;
