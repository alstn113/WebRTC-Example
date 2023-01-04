import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { FullHeightScreen } from './MainLayout.styles';

const MainLayout = () => {
  return (
    <>
      <FullHeightScreen>
        <Header />
        <Outlet />
      </FullHeightScreen>
      <Footer />
    </>
  );
};

export default MainLayout;
