import {
  AppBar, Container, Toolbar, Typography,
} from '@mui/material';

function Footer() {
  return (
    <AppBar position="static" className="bg-light text-dark">
      <Container maxWidth="md">
        <Toolbar className="justify-content-center">
          <Typography variant="body1" color="inherit">
            Copyright &copy; 2022
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;
