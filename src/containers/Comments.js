import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  ListGroupItem,
  Input,
  Form } from "reactstrap"

const Comments = ({imageId})=>{
  const [comments, setComments] = useState([])
  const [input, setInput] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleInput = (e) =>{
    setInput(e.target.value)
  }

  const handleComment = (e)=>{
    e.preventDefault()
    axios({
      method: 'POST',
      url: `https://insta.nextacademy.com/api/v1/images/${imageId}/comments`,
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("token")
      },
      data: {
        content: input,
      }
    })
      .then(resp => {
        console.log(resp)
        setInput("")
        setSubmitted(true)
      })
      .catch(error => {
        console.log('ERROR: ', error)
    })
    setSubmitted(false)
  }

  const handleLike = (commentId) =>{
    axios({
      method: 'POST',
      url: `https://insta.nextacademy.com/api/v1/comments/${commentId}/toggle_like`,
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

  useEffect( () => {
    axios.get(`https://insta.nextacademy.com/api/v1/images/${imageId}/comments`,
    {
      headers : {
        "Authorization" : "Bearer " + localStorage.getItem("token")
      }
    })
      .then(resp => {
        setComments(resp.data)
      })
      .catch(error => {
        console.log('ERROR: ', error)
    })
  }, [imageId, submitted])

  return (
    <>
      {
      comments.map(com=>{
        return(
          <ListGroupItem key={com.id} className="d-flex px-1">
            <div className="col-2 px-0">
              <img src={com.posted_by.profileImage} alt={`postedby-${com.posted_by.email}`} className="rounded-circle" width="30" height="30"/>
            </div>
            <span className="col-8 px-0">{com.content}</span>
            {
              com.liked
              ? <span className="col-2 px-0 text-danger" onClick={()=>handleLike(com.id)}>Unlike</span>
              : <span onClick={()=>handleLike(com.id)} className="col-2 px-0 text-primary">Like</span>
            }
          </ListGroupItem>
        )
      })
      }
      <ListGroupItem>
        <Form onSubmit={handleComment}>
          <Input value={input} onChange={handleInput}/>
        </Form>
      </ListGroupItem>
    </>
  )
}
export default Comments