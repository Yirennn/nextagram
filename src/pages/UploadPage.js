import React, { useState , useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Form,
  FormGroup,
  Input,
  FormText,
  Button
  } from 'reactstrap';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const UploadPage = () => {
const [imageFile, setImageFile] = useState(null)
const [previewImage, setPreviewImage] = useState(null)
const history = useHistory()

useEffect(() => {
  document.title = "Upload Your Image"
}, [])

const handleImageUpload = (e) => {
  e.preventDefault()
  const formData = new FormData()

  formData.append("image", imageFile)

  axios({
    method: "post",
    url: "https://insta.nextacademy.com/api/v1/images/",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    data: formData
  }).then(resp => {
    console.log(resp)
    setImageFile(null)
    setPreviewImage(null)
    history.push("/profile")
    toast.success("Image uploaded successfully!")
  })
}

const handleInputChange = (e) => {
  setPreviewImage(URL.createObjectURL(e.target.files[0]))
  setImageFile(e.target.files[0])
}

return (
  <div>
    <Card>
      {previewImage ? (
        <img src={previewImage} alt="preview" width="50%" height="50%"/>
        ) : (
          <h3 className="text-center">Preview</h3>
        )}
    </Card>
    <Form onSubmit={handleImageUpload}>
      <FormGroup>
        <Input type="file" name="image-file" onChange={handleInputChange}/>
        <FormText color="muted">
          Make sure the image format being uploaded is supported.
        </FormText>
      </FormGroup>
      <Button type="submit" color="success">Upload</Button>
    </Form>
  </div>
  )
}

export default UploadPage