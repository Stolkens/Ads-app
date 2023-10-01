import Footer from "../Footer/Footer";
import MainMenu from "../MainMenu/MainMenu";
import styles from './MainLayout.module.scss';
import PropTypes from 'prop-types';

const MainLayout = ({children}) => {
  return (
    <div className={styles.container}>
      <MainMenu />
      {children}
      <Footer />
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;