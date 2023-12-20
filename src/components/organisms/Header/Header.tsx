import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "./Header.module.css";
import Navbar from "../../molecules/Navbar/Navbar";
import Link from "next/link";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const token = Cookies.get("jwtToken");

      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoggedInStatus();
  }, [isLoggedIn]);

  const logOut = () => {
    const token = Cookies.remove("jwtToken");

    if (token == undefined) {
      router.push("/login");
    }
  };

  return (
    <div className={styles.header}>
      <div>
        <Link href="/" className={styles.logo}>
          logo
        </Link>
      </div>
      <div className={styles.navbarWrapper}>
        <Navbar />
        {!isLoggedIn ? (
          <Link href="/login" className={styles.login}>
            log in
          </Link>
        ) : (
          <button onClick={logOut} className={styles.logoutBtn}>
            log out
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
