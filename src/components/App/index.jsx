import React, { PureComponent } from "react";
import User from "../User/user";
import { Container } from "react-bootstrap";
class App extends PureComponent {

  render() {
    return (
      <>
        <h1 className="text-center">Welcome to the page</h1>
        <Container className="mt-5 text-dark">
          <User/>
        </Container>
      </>
    );
  }
}

export default App;
