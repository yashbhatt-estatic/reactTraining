import React, { PureComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
  }
}

export default App;
