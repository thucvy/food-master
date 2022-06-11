import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import "./NavBar.css";

const NavBar = () => {
  // change nav color when scrolling
  const [changeNav, setChangeNav] = useState(false);

  const changeNavColor = () => {
    if (window.scrollY > 100) {
      setChangeNav(true);
    } else {
      setChangeNav(false);
    }
  };

  window.addEventListener("scroll", changeNavColor);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={changeNav ? "custom-nav scrolled" : "custom-nav"}
      variant="dark"
      sticky="top"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Cooking Master</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="fridge">
              <Nav.Link>Your Fridge</Nav.Link>
            </LinkContainer>
            <LinkContainer to="loved-recipe">
              <Nav.Link>Loved Recipes</Nav.Link>
            </LinkContainer>
            <LinkContainer to="search-history">
              <Nav.Link>Search History</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
