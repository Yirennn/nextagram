import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroupItem } from 'reactstrap';

const Likes = ({imageId}) => {
  const [liked, setLiked] = useState(false)
  const [likeUsers, setLikeUsers] = useState([])
  const [submitted, setSubmitted] = useState(false)

  useEffect( () => {
    axios.get(`https://insta.nextacademy.com/api/v2/images/${imageId}`,
    {
      headers : {
        "Authorization" : "Bearer " + localStorage.getItem("token")
      }
    })
      .then(resp => {
        console.log(resp.data)
        setLiked(resp.data.liked)
        setLikeUsers(resp.data.likes)
      })
      .catch(error => {
        console.log('ERROR: ', error)
    })
  },[imageId, submitted])

  const handleImageLike = () => {
    axios({
      method: 'POST',
      url: `https://insta.nextacademy.com/api/v1/images/${imageId}/toggle_like`,
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("token")
      },
    })
      .then(resp => {
        console.log(resp)
        setSubmitted(true)
      })
      .catch(error => {
        console.log('ERROR: ', error)
    })
    setSubmitted(false)
  }

  return (
    <ListGroupItem>
      {liked
      ? <span onClick={handleImageLike} className="text-danger">Unlike</span>
      : <span onClick={handleImageLike} className="text-primary">Like</span> 
      }
      {likeUsers.length}
    </ListGroupItem>
  )
}

export default Likes