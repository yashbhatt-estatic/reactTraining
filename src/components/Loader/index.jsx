import { useEffect, useState } from 'react';
import loader from './assets/loader.svg';

export default function Loader() {
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    setLoadData(props.loadData);
  }, [loadData]);

  return (
    loadData === 'false' ? <img src={loader} alt="loader" /> : null
  );
}
