import React from 'react';
import {
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
  } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import AuthModal from '../components/AuthModal';

const TopBar = ({token, setToken}) => {

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken(null)
    history.push("/")
  }

  const history = useHistory()

  return(
    <Navbar color="secondary" dark expand="md">
      <NavbarBrand cursor="pointer" onClick={() => {history.push('/')}}>
        Nextagram
      </NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
            <NavLink onClick={() => {history.push("/profile")}}>Profile</NavLink>
        </NavItem>
      </Nav>
      <Nav>
        <NavItem>
          <NavLink>
            {token
            ? <Button outline color="warning" onClick={handleLogout}>Logout</Button>
            : <AuthModal setToken={setToken}/>
            }
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default TopBar