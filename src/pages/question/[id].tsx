import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./styles.module.css";
import Header from "../../components/organisms/Header/Header";
import Footer from "../../components/organisms/Footer/Footer";
import Question from "../../components/organisms/Question/Question";
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
    const response = await axios.get(
      `http://localhost:3001/answers/questions/${id}`
    );
    setAnswers(response.data.answers);
  };

  const fetchQuestion = async (id: string) => {
    const response = await axios.get(`http://localhost:3001/questions/${id}`);
    setQuestion(response.data.question);
  };

  useEffect(() => {
    router.query.id && fetchAnswers(router.query.id as string);
    fetchQuestion(router.query.id as string);
  }, [router.query.id]);

  return (
    <div>
      <Header />
      <div></div>
      {question && <div>{question.question_text}</div>}
      <Answers answers={answers} />
      <Footer />
    </div>
  );
};

export default QuestionPage;
