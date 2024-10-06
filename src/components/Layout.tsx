import { NextComponentType } from "next";
import { Header } from "./Header";
import backgroundImage from "../../assets/background.png";
import styles from "../../styles/components/Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: NextComponentType<{}, {}, LayoutProps> = ({ children }) => {
  return (
    <div className={styles.background} style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
