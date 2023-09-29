import Footer from "../Footer/Footer";
import MainMenu from "../MainMenu/MainMenu";
import styles from './MainLayout.module.scss';

const MainLayout = () => {
  return (
    <div className={styles.container}>
      <MainMenu />
      <Footer />
    </div>
  );
}

export default MainLayout;