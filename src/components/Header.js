import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar bg="light" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href='/'>Todo App</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href='/'>Home</Nav.Link>
        <Nav.Link href='/todos'>Todos</Nav.Link>
        <Nav.Link href='/users'>Users</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  );
}

export default Header;