import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const MainMenu = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Navbar.Brand href="/">Ads-App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default MainMenu;