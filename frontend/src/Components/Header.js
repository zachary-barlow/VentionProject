import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

function Header() {

  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="#home">Inventory</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Header;