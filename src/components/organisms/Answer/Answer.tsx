import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./Answer.module.css";
import Button from "../../atoms/Button/Button";

type GainedLikesObjectType = {
  userId: string;
};

type GainedDislikesObjectType = {
  userId: string;
};

type AnswerType = {
  answer_text: string;
  date: string;
  question_id: string;
  user_id: string;
  id: string;
};

type AnswerComponentType = {
  answer: AnswerType;
  setShowDeleteAnswerModal: () => void;
  setSelectedAnswerId: (id: string) => void;
  showDeleteAnswerBtn: boolean;
  checkLoggedInStatusForDeleteButton: () => void;
  showLikeAndDislikeButtons: boolean;
};

const Answer: React.FC<AnswerComponentType> = ({
  answer,
  setShowDeleteAnswerModal,
  setSelectedAnswerId,
  showDeleteAnswerBtn,
  checkLoggedInStatusForDeleteButton,
  showLikeAndDislikeButtons,
}) => {
  const answerId = answer.id;
  // const userId = answer.user_id;

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [gainedLikes, setGainedLikes] = useState<Array<GainedLikesObjectType>>(
    []
  );
  const [gainedDislikes, setGainedDislikes] = useState<
    Array<GainedDislikesObjectType>
  >([]);

  const handleClick = (id: string) => {
    setShowDeleteAnswerModal();
    console.log(id);
    setSelectedAnswerId(id);
  };

  const likeAnswer = () => {
    setIsLiked((prevstate) => !prevstate);
    setIsDisliked(false);
    const dislikesArray = gainedDislikes.filter(
      (item) => item.userId !== answer.user_id
    );
    setGainedDislikes(dislikesArray);

    const isLiked = gainedLikes.find((item) => item.userId === answer.user_id);

    if (isLiked) {
      const array = gainedLikes.filter(
        (item) => item.userId !== answer.user_id
      );
      return setGainedLikes(array);
    }

    setGainedLikes([...gainedLikes, { userId: answer.user_id }]);
  };

  const dislikeAnswer = () => {
    setIsDisliked((prevstate) => !prevstate);
    setIsLiked(false);
    const likesArray = gainedLikes.filter(
      (item) => item.userId !== answer.user_id
    );
    setGainedLikes(likesArray);

    const isDisliked = gainedDislikes.find(
      (item) => item.userId === answer.user_id
    );

    if (isDisliked) {
      const array = gainedDislikes.filter(
        (item) => item.userId !== answer.user_id
      );
      return setGainedDislikes(array);
    }

    setGainedDislikes([...gainedDislikes, { userId: answer.user_id }]);
  };

  useEffect(() => {
    checkLoggedInStatusForDeleteButton();
    console.log("gainedLikes", gainedLikes);
    console.log("gainedDislikes", gainedDislikes);
  }, [checkLoggedInStatusForDeleteButton, gainedLikes, gainedDislikes]);

  const formattedDate = new Date(answer.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className={styles.answer}>
      <div className={styles.answerText}>{answer.answer_text}</div>
      <div className={styles.bottomWrapper}>
        <div className={styles.date}>{formattedDate}</div>
        <div className={styles.btnWrapper}>
          {showLikeAndDislikeButtons && (
            <div className={styles.likeAndDislikeButtonsWrapper}>
              <button
                onClick={() => likeAnswer()}
                className={!isLiked ? styles.likeBtn : styles.clickedLikeBtn}
              >
                Like
              </button>
              <button
                onClick={() => dislikeAnswer()}
                className={
                  !isDisliked ? styles.dislikeBtn : styles.clickedDislikeBtn
                }
              >
                Dislike
              </button>
            </div>
          )}
          {showDeleteAnswerBtn && (
            <Button
              onClick={() => handleClick(answerId)}
              text="Delete Answer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Answer;
