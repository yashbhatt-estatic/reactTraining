import { Switch } from 'antd';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTheme } from '../../theme/use-theme';
import logo from './assets/theOne.png';

function Header() {
  const [darkMode, setDarkMode] = useTheme();

  return (
    <Navbar bg="light shadow" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="=30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto h5" fill variant="tabs" activeKey={window.location.pathname} justify>
            <Nav.Link className="text-dark" href="/">
              Home
            </Nav.Link>
            <Nav.Link className="text-dark" href="/user">
              User
            </Nav.Link>
            <Nav.Link className="text-dark" href="/counter">
              Counter
            </Nav.Link>
            <Nav.Link className="text-dark" href="/queryParameter">
              QueryParameter
            </Nav.Link>
            <Nav.Link className="text-dark" href="/form">
              SignupForm
            </Nav.Link>
            <Nav.Link className="text-dark" href="/ipRouting">
              InputRouting
            </Nav.Link>
            <Nav.Link className="text-dark" href="/userCrud">
              UserCRUD
            </Nav.Link>
            <Nav.Link className="text-dark" href="/axiosUserCrud">
              AxiosUserCRUD
            </Nav.Link>
          </Nav>
          <Switch checked={darkMode} onChange={setDarkMode} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
