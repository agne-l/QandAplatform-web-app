import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "../styles/Home.module.css";
import Questions from "../components/organisms/Questions/Questions";
import AskQuestionForm from "../components/organisms/AskQuestionForm/AskQuestionForm";
import LoginModal from "../components/molecules/LoginModal/LoginModal";
import Button from "../components/atoms/Button/Button";
import PageTemplate from "../components/organisms/PageTemplate/PageTemplate";

const HomePage = () => {
  // const router = useRouter();

  const [askQuestionForm, setAskQuestionForm] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  // const [questionText, setQuestionText] = useState("");

  // const onAddQuestion = async () => {
  //   const body = {
  //     question_text: questionText,
  //   };

  //   const headers = {
  //     authorization: Cookies.get("jwtToken"),
  //   };

  //   const response = await axios.post(
  //     "http://localhost:3001/questions",
  //     {
  //       ...body,
  //     },
  //     { headers }
  //   );

  //   if (response.status == 200) {
  //     window.location.reload();
  //   }
  // };

  const [questions, setQuestions] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/questions");
      setQuestions(response.data.questions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkLoggedInStatus = () => {
    const token = Cookies.get("jwtToken");

    if (token) {
      setAskQuestionForm(true);
    } else {
      setLoginModal(true);
    }
  };

  return (
    <PageTemplate>
      <>
        <div className={styles.allQuestionsWrapper}>
          <div className={styles.topWrapper}>
            <div className={styles.title}>All Questions</div>
            <div className={styles.btnWrapper}>
              <Button onClick={checkLoggedInStatus} text="Ask Question" />
            </div>
          </div>
          <Questions questions={questions} />
        </div>
        {askQuestionForm && (
          <AskQuestionForm onCancel={() => setAskQuestionForm(false)} />
        )}
        {loginModal && (
          <LoginModal
            onCancel={() => setLoginModal(false)}
            text="ask a question"
          />
        )}
      </>
    </PageTemplate>
  );
};

export default HomePage;
