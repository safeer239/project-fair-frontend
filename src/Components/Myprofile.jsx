import React from 'react'
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';


function Myprofile() {
  const [open, setOpen] = useState(false);
  return (
    
    <>
      <div className='card shadow bg-light p-3 m-4 d-flex align-items-center'>

        <div className='d-flex'>
        <h3 className='text-center m-3'>My Profile</h3>
        <MDBBtn onClick={() => setOpen(!open)} style={{marginLeft:'350px'}}><i class="fa-solid fa-angle-down"></i></MDBBtn>
        </div>
          <Collapse in={open}>
          <div>
          <label>
            <input type="file" style={{display:'none'}} />
            <img width={'100px'} src="https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0" alt="" />
        </label>
        <div className='m-3'>
        <MDBInput className='mb-3' label='Enter your name' id='form1' type='text' />
        <MDBInput className='mb-3'  label='Enter your Github link' id='form1' type='text' />
        <MDBInput className='mb-3' label='Enter your LinkedIn link' id='form1' type='text' />

        <div className='text-center'>
        <MDBBtn>update</MDBBtn>
        </div>
        </div>
          </div>
          </Collapse>
        
        </div>  
    </>
  )
}

export default Myprofile