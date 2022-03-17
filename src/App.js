import React, { PureComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Apps from './components/App';

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Apps />
      </BrowserRouter>
    );
  }
}

export default App;
