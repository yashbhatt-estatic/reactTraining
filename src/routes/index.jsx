import { Route, Routes } from 'react-router-dom';
import Counter from '../pages/Counter';
import NotFound from '../pages/NotFound';
import Width from '../pages/Width';
import User from '../components/User';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Width />} />
      <Route path="/User" element={<User />} />
      <Route path="/Counter" element={<Counter />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
