import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Loader from '../Loader/loader';
import Footer from './Footer';
import Header from './Header';

function Layout() {
  const { loading } = useSelector((state) => state.commonReducer);
  return (
    <>
      <Header />
      <div className="bg-dark text-white min-vh-100 pt-5 pb-5 w-100">
        <h1 className="text-center">Welcome to the page</h1>
        {loading ? <Loader /> : <Outlet />}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
