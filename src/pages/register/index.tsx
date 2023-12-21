import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./styles.module.css";
import PageTemplate from "../../components/organisms/PageTemplate/PageTemplate";
import Button from "../../components/atoms/Button/Button";

const RegisterPage = () => {
  const router = useRouter();

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const numericRegex = /\d/;

      if (!name || !email || !password) {
        setMessage("Please fill out all required fields.");
        setShowMessage(true);
      } else if (!emailRegex.test(email)) {
        setMessage("You must enter a valid email.");
        setShowMessage(true);
      } else if (password.length < 8 || !numericRegex.test(password)) {
        setMessage(
          "Passwords must be at least 8 characters and contain both alphabetic and numeric characters."
        );
        setShowMessage(true);
      }
      const body = {
        name,
        email,
        password,
      };

      const response = await axios.post(
        "http://localhost:3001/users/register",
        {
          ...body,
        }
      );

      if (response.status == 200) {
        setMessage(
          "Thank you for joining! Your account has been successfully created. Please log in."
        );
        setShowMessage(true);
      }
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.data &&
        err.response.data.message ===
          "There's already an account with this email."
      ) {
        setMessage(
          "There's already an account with the email you provided. Please choose a different email address to continue."
        );
        setShowMessage(true);
      }
      console.log(err);
    }
  };
  return (
    <PageTemplate>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.nameInputWrapper}>
            <div>Name</div>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={styles.emailInputWrapper}>
            <div>Email</div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.passwordInputWrapper}>
            <div>Password</div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <Button onClick={signUp} text="Sign up" />
        </div>
        {showMessage && <div className={styles.messageWrapper}>{message}</div>}
      </div>
    </PageTemplate>
  );
};

export default RegisterPage;
