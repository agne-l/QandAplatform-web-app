import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Header from "../../components/organisms/Header/Header";
import Footer from "../../components/organisms/Footer/Footer";

const RegisterPage = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.emailInputWrapper}>
          <div>Email</div>
          <input />
        </div>
        <div className={styles.emailInputWrapper}>
          <div>Email</div>
          <input />
        </div>
        <div className={styles.passwordInputWrapper}>
          <div></div>
          <input />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
