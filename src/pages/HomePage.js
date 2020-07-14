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
import LoadingIndicator from '../components/LoadingIndicator';
import UserImages from '../containers/UserImages';

const HomePage = () => {
    const [users,setUsers] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        // performing a GET request
        axios.get('https://insta.nextacademy.com/api/v1/users')
        .then(result => {
        // If successful, we do stuffs with 'result'
        //console.log(result.data)
        // assign the data to the users variable
        setUsers(result.data)
        // stop page from keep loading after data fetched
        setIsLoading(false)
        })
        .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log('ERROR: ', error)
        })
    }, [])

    if(isLoading) {
        return <LoadingIndicator height='400px' width='400px' color='lightSeaGreen'/>
    }

    return(
      <div>
        <Container fluid={true} className="p-0 m-0">
        <img className='App-logo' style={{height: '50px'}}></img>
        <h1>Home Page</h1>
          {users.map(user => (
            <Row key={user.id} className="bg-light p-4 mx-0 my-5 rounded">
              <Col sm='2' className="mt-3">
                <CardImg top width="100%" src={user.profileImage} width="100%" alt="Profile image" className="rounded-circle img-thumbnail img-fluid"/>
                <CardBody className="text-center">
                  <CardTitle>{user.username}</CardTitle>
                  <Link to={`/users/${user.id}`}>
                    <Button>See More</Button>
                  </Link>
              </CardBody>
              </Col>
              <Col sm='10'>
                  <UserImages userId={user.id}/>
              </Col>
            </Row>
          ))}
        </Container>
      </div>)
}

export default HomePage;