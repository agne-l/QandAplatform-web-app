import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./AskQuestionForm.module.css";
import Button from "../../atoms/Button/Button";

type AskQuestionFormType = {
  onCancel: () => void;
};

const AskQuestionForm: React.FC<AskQuestionFormType> = ({ onCancel }) => {
  const [questionText, setQuestionText] = useState("");

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const addQuestion = async () => {
    try {
      const body = {
        question_text: questionText,
      };

      const headers = {
        authorization: Cookies.get("jwtToken"),
      };

      const response = await axios.post(
        "http://localhost:3001/questions",
        {
          ...body,
        },
        { headers }
      );

      if (response.status == 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setMessage("Please provide a valid question.");
      setShowMessage(true);
    }
  };
  return (
    <div className={styles.askQuestionForm}>
      <button onClick={onCancel} className={styles.cancelBtn}>
        X
      </button>
      <textarea
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        className={styles.textArea}
      />
      <Button onClick={addQuestion} text="submit" />
      {showMessage ? (
        <div className={styles.msgWrapper}>{message}</div>
      ) : (
        <div className={styles.msgWrapper}></div>
      )}
    </div>
  );
};

export default AskQuestionForm;
