import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

//components
import LoadingIndicator from '../components/LoadingIndicator';
import Likes from './Likes';
import Comments from './Comments';

const UserImages = ({userId}) => {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)
      .then(result => {
        setImages(result.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.log('Error: ' + error)
      })
  },[userId])

    if(isLoading) {
      return <LoadingIndicator width='200px' height='200px' divor='lightCoral'/>
    }

    return (
      <div className="d-flex flex-wrap">
        {images.map((image, index) => {
            if (location.pathname === "/") {
              return (
                <div className='col-12 col-cm-6 col-md-4 p-3 p-sm-0' key={`${userId}-images${index}`}>
                  <img src={image} width='100%' height='250' className='p-1 mx-auto image-fluid' style={{borderRadius: '20px', objectFit: 'cover'}} alt="test"/>
                </div>
              )
            } else {
              return (
                <div className='card col-12 col-sm-6 col-md-4 p-3 p-sm-0' key={`${userId}-images${index}`}>
                  <img src={image} width='100%' height='250' className='p-1 mx-auto image-fluid' style={{borderRadius: '20px', objectFit: 'cover'}} alt="test"/>
                  <Likes imageId={image.id}/>
                  <Comments imageId={image.id}/>
                </div>
              )
            }
          })
          }
      </div>
  )
}

export default UserImages;