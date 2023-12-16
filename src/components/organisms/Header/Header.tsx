import React from "react";
import styles from "./Header.module.css";
import Navbar from "../../molecules/Navbar/Navbar";

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <div>logo</div>
      </div>
      <div className={styles.navbarWrapper}>
        <Navbar />
        <div>login</div>
      </div>
    </div>
  );
};

export default Header;
