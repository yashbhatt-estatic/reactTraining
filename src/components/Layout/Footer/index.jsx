import { Container, Navbar, NavbarBrand } from 'react-bootstrap';

function Footer() {
  return (
    <div className="position-fixed left-0 right-0 bottom-0 w-100 bg-light">
      <Navbar color="light" light>
        <Container maxWidth="md" className="justify-content-center">
          <NavbarBrand>Copyright &copy; 2022</NavbarBrand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Footer;
