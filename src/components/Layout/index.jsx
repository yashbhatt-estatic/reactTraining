import React, { PureComponent } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

class Layout extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <div className="bg-dark text-white" style={{ minHeight: '800px' }}>
          <h1 className="text-center">Welcome to the page</h1>
          <Outlet />
        </div>
        <Footer />
      </>
    );
  }
}

export default Layout;
