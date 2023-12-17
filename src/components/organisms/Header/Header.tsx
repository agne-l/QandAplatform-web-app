import React from "react";
import styles from "./Header.module.css";
import Navbar from "../../molecules/Navbar/Navbar";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <Link href="/" className={styles.logo}>
          logo
        </Link>
      </div>
      <div className={styles.navbarWrapper}>
        <Navbar />
        <Link href="/login" className={styles.login}>
          log in
        </Link>
      </div>
    </div>
  );
};

export default Header;
