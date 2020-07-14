import React, { useState } from 'react';
import {
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
  } from 'reactstrap';
import { useHistory} from 'react-router-dom';
import AuthModal from '../components/AuthModal';

const TopBar = ({token, setToken}) => {
  const history = useHistory()

  return(
    <Navbar color="secondary" dark expand="md">
      <NavbarBrand onClick={() => {history.push('/')}}>Nextagram</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
            <NavLink onClick={() => {history.push('/users/1')}}>My Profile</NavLink>
        </NavItem>
      </Nav>
      <Nav>
        <NavItem>
          <NavLink>
            {token
            ? <Button color="primary">Logout</Button>
            : <AuthModal setToken={setToken}/>
            }
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default TopBar