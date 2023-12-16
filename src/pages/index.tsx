import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Header from "../components/organisms/Header/Header";
import Questions from "../components/organisms/Questions/Questions";
import Footer from "../components/organisms/Footer/Footer";

const HomePage = () => {
  const [questions, setQuestions] = useState(null);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/questions");
    setQuestions(response.data.questions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Questions questions={questions} />
      <Footer />
    </div>
  );
};

export default HomePage;
