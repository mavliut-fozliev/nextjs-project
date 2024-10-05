import { NextComponentType } from "next";
import React from "react";
import styles from "../../styles/components/Header.module.scss";
import Logo from "../../assets/logo.svg";
import profile from "../../assets/profile.png";
import Link from "next/link";
import { useStore } from "../../store/useStore";

export const Header: NextComponentType = () => {
  const store = useStore();

  return (
    <nav className={styles.box}>
      <div className={styles.logo}>
        <Logo />
        <p className={styles.logoText}>Quantum lab</p>
      </div>
      <nav className={styles.menu}>
        <Link href="./" className={styles.menuHome}>
          Главная
        </Link>
        <Link href="./calculator" className={styles.menuCalculator} hidden={!store.name}>
          Калькулятор
        </Link>
        <Link href="./password-generator" className={styles.menuGenerator} hidden={!store.name}>
          Генератор паролей
        </Link>
      </nav>
      <div className={styles.name}>
        <div className={styles.nameText}>{store.name}</div>
        <img src={profile.src} alt="profile" className={styles.nameImage} />
      </div>
    </nav>
  );
};
