import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Counter from '../pages/Counter';
import NotFound from '../pages/NotFound';
import Width from '../pages/Width';
import User from '../pages/User';
import QueryParameter from '../pages/Query Parameter';
import SignupForm from '../pages/Form';
import IpRouting from '../pages/InputRouting';
import Layout from '../components/Layout';
import CrudUser from '../pages/CRUD_User';
import AxiosUserCrud from '../pages/Axios';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Width />} />
        <Route path="/user" element={<User />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/queryParameter" element={<QueryParameter />}>
          <Route path=":users" element={<QueryParameter />} />
        </Route>
        <Route path="/form" element={<SignupForm />} />
        <Route path="/ipRouting" element={<IpRouting />} />
        <Route path="/userCrud" element={<CrudUser />} />
        <Route path="/axiosUserCrud" element={<AxiosUserCrud />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
