import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./styles.module.css";
import PageTemplate from "../../components/organisms/PageTemplate/PageTemplate";
import Button from "../../components/atoms/Button/Button";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async () => {
    try {
      const body = {
        email,
        password,
      };

      const response = await axios.post("http://localhost:3001/users/login", {
        ...body,
      });

      if (response.status == 200) {
        Cookies.set("jwtToken", response.data.token);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setMessage("Incorrect email or password.");
      setShowMessage(true);
    }
  };

  const text = `Don't have an account?`;
  return (
    <PageTemplate>
      <>
        <div className={styles.wrapper}>
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
          <Button onClick={logIn} text="Log in" />
        </div>
        <div className={styles.signUp}>
          <Link href="/register" className={styles.signUp}>
            {text}
          </Link>
        </div>
        {showMessage && <div className={styles.msgWrapper}>{message}</div>}
      </>
    </PageTemplate>
  );
};

export default LoginPage;
