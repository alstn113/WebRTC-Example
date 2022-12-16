// react
import { Route, Routes } from 'react-router-dom';

// ErrorBoundary
import ErrorBoundary from '~/components/ErrorBoundary';
import ErrorFallback from '~/components/ErrorFallback';
import { MESSAGE } from '~/constants/messages';

// layouts
import MainLayout from '~/components/Layouts/MainLayout';

// pages
import Home from '~/pages/Home/Home';
import Room from '~/pages/Room/Room';
import Loading from '~/pages/Loading/Loading';
import NotFound from '~/pages/NotFound/NotFound';

const App = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback message={MESSAGE.ERROR.UNKNOWN} />}>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/room" element={<Room />}>
            <Route path=":roomId" element={<Room />} />
          </Route>
          <Route path="/loading" element={<Loading />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
