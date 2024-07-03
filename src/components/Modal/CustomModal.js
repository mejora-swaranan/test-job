import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useBaseUrl } from '../../route/BaseUrlContext';

export const CustomModal = (props) => {
  const { baseUrl } = useBaseUrl();
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  useEffect(() => {
    //Endpoints/url have to put inside axios request
    axios.post(`${baseUrl}`).then((response) => {
      console.log("Password Update Successfully", response.data);
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
  })

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(password !== confirmPassword){
      alert('Passwords does not match');
      return;
    }
    console.log('updated password----', confirmPassword);
    props.onHide();
  }
    return(
    <Modal
      {...props}            
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Reset Your Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=> setPassword(e.target.value)} value={password}/>
        </div>
        <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="exampleInputPassword2" onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword}/>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={(e)=>handleSubmit(e)}>Update</Button>
      </Modal.Footer>
    </Modal>
    )
}