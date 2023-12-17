import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./styles.module.css";
import Header from "../../components/organisms/Header/Header";
import Footer from "../../components/organisms/Footer/Footer";
import Button from "../../components/atoms/Button/Button";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async () => {
    const body = {
      email,
      password,
    };

    const response = await axios.post("http://localhost:3001/users/login", {
      ...body,
    });

    // console.log(response.data.token);
    if (response.status == 200) {
      Cookies.set("jwtToken", response.data.token);
    }
  };

  const text = `Don't have an account?`;
  return (
    <>
      <Header />
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
        <Button onClick={logIn} text="log in" />
      </div>
      <div className={styles.signUp}>
        <Link href="/register" className={styles.signUp}>
          {text}
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
