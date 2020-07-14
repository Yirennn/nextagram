import React, { useState, useEffect } from 'react';
import UserImages from '../containers/UserImages';
import axios from 'axios';
import { Container } from 'reactstrap';

const MyProfilePage = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    axios.get(`https://insta.nextacademy.com/api/v1/users/me`, 
    {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(result => {
        setUser(result.data)
      })
      .catch(error => {
        console.log('ERROR: ', error)
    })
  }, [])

  return (
    <Container>
      {user
      ?
      <div className="text-center m-3">
        <img src={user.profile_image} alt={user.username} width="150" className="rounded-circle img-thumbnail img-fluid" />
        <h3>@ {user.username}</h3>
      </div>
      : null
      }
      <UserImages userId={user.id}/>
    </Container>
  )
}

export default MyProfilePage