import { useSelector } from 'react-redux';
import loader from './assets/loader.svg';
import './assets/loader.scss';

function Loader() {
  const { loading } = useSelector((state) => state.commonReducer);
  return loading ? <img className="loader bg-dark" src={loader} alt="loader" /> : null;
}

export default Loader;
