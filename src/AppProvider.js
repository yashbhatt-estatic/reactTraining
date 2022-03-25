import { Provider } from 'react-redux';

const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

export default App;
