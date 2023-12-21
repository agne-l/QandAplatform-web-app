import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./GiveAnswerForm.module.css";
import Button from "../../atoms/Button/Button";

type GiveAnswerFormType = {
  onCancel: () => void;
  id: string;
};

const GiveAnswerForm: React.FC<GiveAnswerFormType> = ({ onCancel, id }) => {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const [answerText, setAnswerText] = useState("");

  const addAnswer = async () => {
    console.log("question id", id);
    try {
      const body = {
        answer_text: answerText,
        question_id: id,
      };

      const headers = {
        authorization: Cookies.get("jwtToken"),
      };

      const response = await axios.post(
        `http://localhost:3001/answers/questions/${id}`,
        { ...body },
        { headers }
      );

      if (response.status == 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setMessage("Please provide a valid answer.");
      setShowMessage(true);
    }
  };
  return (
    <div className={styles.giveAnswerForm}>
      <button onClick={onCancel} className={styles.cancelBtn}>
        X
      </button>
      <textarea
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        className={styles.textArea}
      />
      <Button onClick={addAnswer} text="Submit" />
      {showMessage ? (
        <div className={styles.msgWrapper}>{message}</div>
      ) : (
        <div className={styles.msgWrapper}></div>
      )}
    </div>
  );
};

export default GiveAnswerForm;
