import { Route, Routes } from 'react-router-dom';
import Counter from '../pages/Counter';
import NotFound from '../pages/NotFound';
import Width from '../pages/Width';
import User from '../pages/User';
import QueryParameter from '../pages/Query Parameter';
import SignupForm from '../pages/Form';
import IpRouting from '../pages/InputRouting';
import Layout from '../components/Layout';
import CRUD_User from '../pages/CRUD_User';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Width />} />
        <Route path="/User" element={<User />} />
        <Route path="/Counter" element={<Counter />} />
        <Route path="/QueryParameter" element={<QueryParameter />}>
          <Route path=":users" element={<QueryParameter />} />
        </Route>
        <Route path="/Form" element={<SignupForm />} />
        <Route path="/IpRouting" element={<IpRouting />} />
        <Route path="/UserCrud" element={<CRUD_User />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
