import { NextComponentType } from "next";
import React from "react";
import styles from "../../styles/components/Header.module.scss";
import Logo from "../../assets/logo.svg";
import profile from "../../assets/profile.png";
import Link from "next/link";
import { useStore } from "../../store/useStore";
import { Routes } from "../../consts";
import { useRouter } from "next/router";

export const Header: NextComponentType = () => {
  const store = useStore();
  const router = useRouter();

  const currentPath = router.pathname;

  const isActive = (path: string) => (currentPath === path ? styles.active : "");

  return (
    <nav className={styles.box}>
      <div className={styles.logo}>
        <Logo />
        <p className={styles.logoText}>Quantum lab</p>
      </div>
      <nav className={styles.menu}>
        <Link href={Routes.home} className={isActive(Routes.home)}>
          Главная
        </Link>
        <Link href={Routes.calculator} className={isActive(Routes.calculator)} hidden={!store.name}>
          Калькулятор
        </Link>
        <Link href={Routes.passwordGenerator} className={isActive(Routes.passwordGenerator)} hidden={!store.name}>
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
