import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";
import { UserInputForm } from "../src/components/UserInputForm";
import Layout from "../src/components/Layout";

const Home: NextPage = () => {
  return (
    <div className={styles.content}>
      <UserInputForm />
    </div>
  );
};

export default Home;
