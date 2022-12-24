// react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// ErrorBoundary
import ErrorBoundary from '~/components/ErrorBoundary';
import ErrorFallback from '~/components/ErrorFallback';
import { MESSAGE } from '~/constants/messages';

// layouts
import MainLayout from '~/components/Layouts/MainLayout/MainLayout';

// pages
import Home from '~/pages/Home/Home';
import Room from '~/pages/Room/Room';
import Loading from '~/pages/Loading/Loading';
import NotFound from '~/pages/NotFound/NotFound';

// hooks
import userGetMe from './hooks/queries/user/useGetMe';

const App = () => {
  const {} = userGetMe();

  return (
    <ErrorBoundary fallback={<ErrorFallback message={MESSAGE.ERROR.UNKNOWN} />}>
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="loading" element={<Loading />} />
          </Route>
          <Route path="/room" element={<MainLayout />}>
            <Route index element={<></>} />
            <Route path=":roomId" element={<Room />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
