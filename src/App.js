import React, { PureComponent } from 'react';
import Apps from './components/App';

class App extends PureComponent {
  render() {
    return (
      <div className="bg-dark text-white">
        <Apps />
      </div>
    );
  }
}

export default App;
