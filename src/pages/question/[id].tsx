import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./styles.module.css";
import Header from "../../components/organisms/Header/Header";
import Footer from "../../components/organisms/Footer/Footer";
import Question from "../../components/organisms/Question/Question";

type QuestionType = {
  question_text: string;
  date: string;
  id: string;
  user_id: string;
};

const QuestionPage = () => {
  const router = useRouter();

  const [question, setQuestion] = useState<QuestionType | null>(null);

  const fetchData = async (id: string) => {
    const response = await axios.get(`http://localhost:3001/questions/${id}`);
    setQuestion(response.data.question);
  };

  useEffect(() => {
    router.query.id && fetchData(router.query.id as string);
  }, [router.query.id]);

  return (
    <div>
      <Header />
      {question && (
        <div className={styles.questionWrapper}>
          <div>{question.question_text}</div>
          <div>{question.date}</div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default QuestionPage;
