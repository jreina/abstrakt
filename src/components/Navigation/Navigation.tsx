import React from "react";
import { useAuth } from "../../hooks/useauth";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export const Navigation = ({ signOut }: { signOut: any }) => {
  const { user } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">abstrakt</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {user ? (
          <Nav>
            <NavDropdown title={user?.displayName} id="collasible-nav-dropdown">
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={signOut}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
};
