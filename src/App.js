import React, { PureComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import AppRoutes from './routes';

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <div className="bg-dark text-white" style={{ minHeight: '800px' }}>
          <h1 className="text-center">Welcome to the page</h1>
          <AppRoutes />
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
