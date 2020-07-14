import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Container} from 'reactstrap';
import UserImages from '../containers/UserImages';
import LoadingIndicator from '../components/LoadingIndicator';

const UserProfilePage = () => {
    const {id} = useParams()
    const [user,setUser] = useState(null)
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
        .then(result => 
            setUser(result.data),
            setIsLoading(false))
        .catch(error => console.log('ERROR', error))
    },[id])

    if (isLoading) {
        return (
            <LoadingIndicator width='50px' height='50px' color='lightYellow'/>
        )
    }

    return (
        <Container>
          {
            user ?
            <div>
              <img src={user.profileImage} alt={user.username} width="150" className="rounded-circle img-thumbnail img-fluid" />
              <h3></h3>
            </div>
            : null
          }
            <h1>{user.username}</h1>
            <br/>
            <img src={user.profileImage} height='200px' width='200px' style={{borderRadius: '50%'}}/>
            <hr/>
            <UserImages userId={id}/>
        </Container>
    )
}

export default UserProfilePage