import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [userEmail, setUserEmail] = useState(null); // Store user email in state
  const navigate = useNavigate();

  // Use useEffect to check if the user is logged in
  useEffect(() => {
    // Get the user email from localStorage
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email); // Set email in state if user is logged in
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('googleToken');
    localStorage.removeItem('userEmail');
    setUserEmail(null); // Clear email from state

    // Redirect user to the login page after logout
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
              {userEmail ? (
                <Dropdown>
                  {/* If logged in, show the user's email and a sign-out button */}
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FaUser /> {userEmail}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item  as="button" onClick={handleLogout}>
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

