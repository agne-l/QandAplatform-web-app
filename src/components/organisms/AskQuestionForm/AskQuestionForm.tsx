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

  const addQuestion = async () => {
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
    </div>
  );
};

export default AskQuestionForm;
