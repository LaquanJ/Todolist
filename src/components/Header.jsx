import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthenticatedTemplate, withMsal } from '@azure/msal-react';

// custom modules
import './Header.css';

function Header() {
  return (
    <Container className='navbar'>
      <div className='navbar-menu'>
        <AuthenticatedTemplate>
          <NavLink to='/' id='home' className='nav-link' exact='true'>
            Home
          </NavLink>
          <NavLink to='/todos' id='todos' className='nav-link' exact='true'>
            Todos
          </NavLink>
          <NavLink to='/users' id='users' className='nav-link' exact='true'>
            Users
          </NavLink>
        </AuthenticatedTemplate>
      </div>
    </Container>
  );
}

export default withMsal(Header);
