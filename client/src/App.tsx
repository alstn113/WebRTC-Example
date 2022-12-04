import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Loading from './pages/Loading/Loading';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/loading" element={<Loading />} />
      {/* catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
