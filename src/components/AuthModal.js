import React, { useState } from 'react';
import { Button, Modal } from 'reactstrap';
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

const AuthModal = ({className, setToken}) => {
  const [modal, setModal] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const toggle = () => setModal(!modal)
  const toggleForm = () => setShowLogin(!showLogin)

  return (
    <div>
      <Button color="info" onClick={toggle} className="m-1">Log In</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        {
          showLogin 
          ?
          <LoginForm toggle={toggle} toggleForm={toggleForm} setToken={setToken}/>
          :
          <SignupForm toggle={toggle} toggleForm={toggleForm}/>
        }
      </Modal>
    </div>
  );
}

export default AuthModal;