import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';



const Header = () => {

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                
                <Navbar.Brand href="/">
                Canvendor
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">

                    <LinkContainer to='/login'>
                    <Nav.Link href="/login">
                    <FaUser /> Sign In
                    </Nav.Link>
                    </LinkContainer>


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header