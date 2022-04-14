import { Switch } from 'antd';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTheme } from '../../theme/use-theme';

function Header() {
  const [darkMode, setDarkMode] = useTheme();
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-dark" href="/">Home</Nav.Link>
            <Nav.Link className="text-dark" href="/user">User</Nav.Link>
            <Nav.Link className="text-dark" href="/counter">Counter</Nav.Link>
            <Nav.Link className="text-dark" href="/queryParameter">QueryParameter</Nav.Link>
            <Nav.Link className="text-dark" href="/form">SignupForm</Nav.Link>
            <Nav.Link className="text-dark" href="/ipRouting">InputRouting</Nav.Link>
            <Nav.Link className="text-dark" href="/userCrud">UserCRUD</Nav.Link>
            <Nav.Link className="text-dark" href="/axiosUserCrud">AxiosUserCRUD</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Switch checked={darkMode} onChange={setDarkMode} />
      </Container>
    </Navbar>
  );
}

export default Header;
