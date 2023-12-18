import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./styles.module.css";
import Header from "../../components/organisms/Header/Header";
import Footer from "../../components/organisms/Footer/Footer";
// import Question from "../../components/organisms/Question/Question";
import Answers from "../../components/organisms/Answers/Answers";

type QuestionType = {
  question_text: string;
  date: string;
  id: string;
  user_id: string;
};

const QuestionPage = () => {
  const router = useRouter();

  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [answers, setAnswers] = useState([]);

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

  return (
    <div>
      <Header />
      <div className={styles.questionWrapper}>
        {question && <div>{question.question_text}</div>}
        <button onClick={deleteQuestion}>delete question</button>
      </div>
      <Answers answers={answers} />
      <Footer />
    </div>
  );
};

export default QuestionPage;
