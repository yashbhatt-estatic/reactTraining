/* eslint-disable react/destructuring-assignment */
import { Component } from 'react';
import loader from './assets/loader.svg';

const Loader = (ComposedComponent) => class extends Component {
  constructor() {
    super();
    this.state = {
      data: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: false,
      });
    }, 1000 * 2);
  }

  render() {
    return this.state.data ? <img className="loader" src={loader} alt="loader" /> : <ComposedComponent />;
  }
};

export default Loader;
