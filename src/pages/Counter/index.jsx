import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

function Counter() {
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState();

  const Reset = (() => {
    setCounter(0);
  });

  const Increase = (() => {
    setCounter(counter + 1);
    setError();
  });

  const Decrease = (() => {
    if (counter > 0) {
      setCounter(counter - 1);
    } else {
      setError('Negative value is not allowed.');
      Reset();
    }
  });

  return (
    <Container className="p-2 mb-3 text-center text-white">
      <h3>
        Counter :
        {' '}
        {counter}
      </h3>
      <Button className="p-3 m-3 btn-lg" variant="light" disabled={error} onClick={() => Reset()}>Reset</Button>
      <Button className="p-3 m-3 btn-lg" variant="light" onClick={() => Increase()}>Increase</Button>
      <Button className="p-3 m-3 btn-lg" variant="light" disabled={error} onClick={() => Decrease()}>Decrease</Button>
      <br />
      <h3>{error}</h3>
    </Container>
  );
}

export default Counter;
