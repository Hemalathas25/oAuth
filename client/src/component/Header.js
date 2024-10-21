import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'; 
import { AuthContext } from '../context/authContext'; 

const Header = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Canvendor</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isAuthenticated ? (
                <Dropdown>
                  {/* If logged in, show the user's email and a sign-out button */}
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FaUser /> {user?.email} 
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={handleLogout}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>

                </Dropdown>
                
              ) : (
                <LinkContainer to='/login'>
                  {/* If not logged in, show the sign-in link */}
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
