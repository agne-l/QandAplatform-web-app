import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "../styles/Home.module.css";
import Header from "../components/organisms/Header/Header";
import Questions from "../components/organisms/Questions/Questions";
import Footer from "../components/organisms/Footer/Footer";

const HomePage = () => {
  const router = useRouter();

  const [questionText, setQuestionText] = useState("");

  const onAddQuestion = async () => {
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

  const [questions, setQuestions] = useState(null);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/questions");
    setQuestions(response.data.questions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <div className={styles.formWrapper}>
            <div>Ask Anything</div>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className={styles.textArea}
            />
            <button onClick={onAddQuestion} className={styles.submitBtn}>
              submit
            </button>
          </div>
        </div>
        <div className={styles.allQuestionsWrapper}>
          <div>All Questions</div>
          <Questions questions={questions} />
        </div>
        <div></div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
