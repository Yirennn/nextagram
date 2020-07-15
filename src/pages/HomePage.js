import React, { useState, useEffect } from 'react';
import {
  CardImg,
  CardBody,
  CardTitle,
  Button,
  Container,
  Row,
  Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

// components
import LoadingIndicator from '../components/LoadingIndicator';
import UserImages from '../containers/UserImages';

const HomePage = () => {
    const [users,setUsers] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        axios.get('https://insta.nextacademy.com/api/v1/users')
        .then(resp => {
        setUsers(resp.data)
        setIsLoading(false)
        })
        .catch(error => {
        console.log('ERROR: ', error)
        })
    }, [])

    if(isLoading) {
        return <LoadingIndicator height='400px' width='400px' color='lightSeaGreen'/>
    }

    return(
      <div>
        <Container fluid={true} className="p-0 m-0">
          {users.map(user => (
            <Row key={user.id} className="bg-light p-4 mx-0 my-5 rounded">
              <Col sm="2" className="mt-3">
                <CardImg top width="100%" src={user.profileImage} alt="Profile image" className="rounded-circle img-thumbnail img-fluid"/>
                <CardBody className="text-center">
                  <CardTitle>{user.username}</CardTitle>
                  <Link to={`/users/${user.id}`}>
                    <Button>See More</Button>
                  </Link>
                </CardBody>
              </Col>
              <Col sm="10">
                  <UserImages userId={user.id}/>
              </Col>
            </Row>
          ))}
        </Container>
      </div>)
}

export default HomePage;