import React, { PureComponent } from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import AppRoutes from '../../routes';

class Apps extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <div className="bg-dark text-white" style={{ minHeight: '900px' }}>
          <h1 className="text-center">Welcome to the page</h1>
          <AppRoutes />
        </div>
        <Footer />
      </>
    );
  }
}

export default Apps;
