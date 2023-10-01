import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Navbar.Brand> 
          <Link to="/">
          Ads App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link><Link to="/">Home</Link></Nav.Link>
            <Nav.Link><Link to="/register">Register</Link></Nav.Link>
            <Nav.Link><Link to="/login">Login</Link></Nav.Link>
            <Nav.Link><Link to="/logout">Logout</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default MainMenu;