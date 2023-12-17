import styles from "./Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <input placeholder="search" className={styles.searchbar} />
      <ul>
        <li>xxx</li>
        <li>xxx</li>
      </ul>
    </div>
  );
};

export default Navbar;
