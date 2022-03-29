import React, { PureComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loader from './components/Loader/loader';
import AppRoutes from './routes';

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Loader />
        <AppRoutes />
      </BrowserRouter>
    );
  }
}

export default App;
