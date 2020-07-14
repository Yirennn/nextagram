import React, { useState } from "react"
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  ModalBody,
  ModalHeader
  } from "reactstrap";
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginForm = ({toggle, toggleForm, setToken}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleInput = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value)
    }
    if (e.target.name === "password") {
      setPassword(e.target.value)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    axios({
      method: "post",
      url: "https://insta.nextacademy.com/api/v1/login",
      data: {
        username: username,
        password: password
      }
    }).then((resp) => {
      localStorage.setItem("token", resp.data.auth_token)
      setToken(resp.data.auth_token)
      toggle()
    }).catch(() => {
      toast.error("Username or password is incorrect!")
    })
  }
   
  return (
    <>
      <ModalHeader toggle={toggle}>Login Form</ModalHeader>
      <ModalBody>
        <Form id="login-form" onSubmit={handleLogin}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" value={username} onChange={handleInput} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" value={password} onChange={handleInput}/>
          </FormGroup>
        </Form>
        <span>Not a member yet? </span>
        <input type="submit" className="btn btn-outline-info" form="signup-form" value="Sign up now" onClick={toggleForm}/>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" type="submit">Log In</Button>{' '}
        <Button color="secondary">Cancel</Button>
      </ModalFooter>
    </>
  );
};
export default LoginForm