import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Container} from 'reactstrap';

//components
import UserImages from '../containers/UserImages';
import LoadingIndicator from '../components/LoadingIndicator';

const UserProfilePage = () => {
  const {userId} = useParams()
  const [user,setUser] = useState(null)
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`https://insta.nextacademy.com/api/v1/users/${userId}`)
    .then(resp => 
      setUser(resp.data),
      setIsLoading(false))
    .catch(error => console.log('ERROR', error))
  }, [userId])

  if (isLoading) {
    return (
      <LoadingIndicator width='50px' height='50px' color='lightYellow'/>
      )
  }

  return (
    <Container>
      {
        user ?
        <div className="text-center m-3">
          <img src={user.profileImage} alt={user.username} width="150" className="rounded-circle img-thumbnail img-fluid" />
          <h3>@ {user.username}</h3>
        </div>
        : null
      }
        <UserImages userId={userId}/>
    </Container>
    )
}

export default UserProfilePage