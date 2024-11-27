import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export const NavBar = ({ loggedIn }) => {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        data-bs-theme="light"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            InTheLoop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Search
              </Nav.Link>
              {loggedIn ? (
                <Nav.Link as={Link} to="/auth">
                  My Podcasts
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/auth">
                  Log in
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
