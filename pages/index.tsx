import type { NextPage } from "next";
import backgroundImage from "../assets/background.png";
import styles from "../styles/Home.module.scss";
import { Header } from "../src/components/Header";
import { UserInputForm } from "../src/components/UserInputForm";

const Home: NextPage = () => {
  return (
    <div className={styles.background} style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <Header />
      <div className={styles.content}>
        <UserInputForm />
      </div>
    </div>
  );
};

export default Home;
