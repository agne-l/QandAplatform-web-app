import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./styles.module.css";
import Header from "../../components/organisms/Header/Header";
import Footer from "../../components/organisms/Footer/Footer";
// import Question from "../../components/organisms/Question/Question";
import Answers from "../../components/organisms/Answers/Answers";
import GiveAnswerForm from "../../components/organisms/GiveAnswerForm/GiveAnswerForm";
import "../../components/molecules/LoginModal/LoginModal";
import LoginModal from "../../components/molecules/LoginModal/LoginModal";
import Button from "../../components/atoms/Button/Button";

type QuestionType = {
  question_text: string;
  date: string;
  id: string;
  user_id: string;
};

const QuestionPage = () => {
  const router = useRouter();

  const [showGiveAnswerForm, setShowGiveAnswerForm] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);

  const showDeleteButton = () => {
    const token = Cookies.get("jwtToken");

    if (token) {
      setDeleteButton(true);
    }
  };

  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");

  // const giveAnswer = async () => {
  //   console.log(router.query.id);

  //   const newAnswer = {
  //     answer_text: answer,
  //     question_id: router.query.id,
  //   };

  //   const headers = {
  //     authorization: Cookies.get("jwtToken"),
  //   };

  //   const response = await axios.post(
  //     `http://localhost:3001/answers/questions/${router.query.id}`,
  //     { ...newAnswer },
  //     { headers }
  //   );

  //   console.log(response);
  //   if (response.status == 200) {
  //     window.location.reload();
  //   }
  // };

  const fetchAnswers = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/answers/questions/${id}`
      );
      setAnswers(response.data.answers);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchQuestion = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/questions/${id}`);
      setQuestion(response.data.question);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    router.query.id && fetchAnswers(router.query.id as string);
    router.query.id && fetchQuestion(router.query.id as string);
    showDeleteButton();
  }, [router.query.id]);

  const deleteQuestion = async () => {
    const headers = {
      authorization: Cookies.get("jwtToken"),
    };

    const response = await axios.delete(
      `http://localhost:3001/questions/${router.query.id}`,
      { headers }
    );

    if (response.status == 200) {
      router.push("/");
    }
  };

  const checkLoggedInStatus = () => {
    const token = Cookies.get("jwtToken");

    if (token) {
      setShowGiveAnswerForm(true);
    } else {
      setLoginModal(true);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.allAnswersWrapper}>
        <div className={styles.topWrapper}>
          {question && (
            <div className={styles.title}>{question.question_text}</div>
          )}
          <div className={styles.btnWrapper}>
            <Button onClick={checkLoggedInStatus} text="Give Answer" />
            {deleteButton && (
              <Button onClick={deleteQuestion} text="Delete Question" />
            )}
          </div>
        </div>
        {answers && <Answers answers={answers} />}
      </div>
      <div></div>
      <div></div>
      {showGiveAnswerForm && (
        <GiveAnswerForm
          onCancel={() => setShowGiveAnswerForm(false)}
          id={router.query.id as string}
        />
      )}
      {loginModal && (
        <LoginModal
          onCancel={() => setLoginModal(false)}
          text="answer the question"
        />
      )}
      <Footer />
    </div>
  );
};

export default QuestionPage;
