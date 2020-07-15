import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

// components
import UserImages from '../containers/UserImages';

const MyProfilePage = () => {
  const [user, setUser] = useState({})
  const history = useHistory()

  useEffect(() => {
    document.title = "My Profile"
    axios.get(`https://insta.nextacademy.com/api/v1/users/me`, 
    {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(resp => {
        setUser(resp.data)
      })
      .catch(error => {
        console.log('ERROR: ', error)
    })
  }, [])

  console.log(user)

  return (
    <Container className="text-center m-3">
      {user
      ?
      <div>
        <img src={user.profile_image} alt={user.username} height="150" width="150" className="rounded-circle img-thumbnail img-fluid" />
        <h3>@ {user.username}</h3>
      </div>
      : null
      }
      <Button onClick={() => {history.push("/upload")}}>Upload Image</Button>
      <UserImages userId={user.id}/>
    </Container>
  )
}

export default MyProfilePage