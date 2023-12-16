import styles from "./Questions.module.css";
import Question from "../Question/Question";

const Questions = ({ questions }) => {
  console.log(questions);
  return (
    <div>
      <Question />
    </div>
  );
};

export default Questions;
