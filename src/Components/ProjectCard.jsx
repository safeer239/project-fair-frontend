import React, { useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
  } from 'mdb-react-ui-kit';
  import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import ProjectImg from '../Assets/projectImg.jpg'
import { base_url } from '../services/base_url';


function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    < >
        {
          project && <MDBCard onClick={handleShow} style={{width:'100%'}}>
          <MDBCardImage src={project?`${base_url}/uploads/${project.projectImg}`:"Null"} style={{width:'100%',height:'260px',objectFit:'contain'}} position='top' alt='...' />
          <MDBCardBody className='w-100'>
            <MDBCardTitle className='text-center'>{project.title}</MDBCardTitle>
            {/* <MDBCardText>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </MDBCardText>
            <MDBBtn href='#'>Button</MDBBtn> */}
          </MDBCardBody>
        </MDBCard>
        }

    {project &&<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Row>
            <Col>
            <img src={project?`${base_url}/uploads/${project.projectImg}`:"Null"} width={'100%'} alt="" />
            </Col>
            <Col>
            <h4>{project.title}</h4>
            <p>{project.overview}</p>
            <h5>Technology Used: {project.language}</h5>
            </Col>
         </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            <a href={project.github}>
          <i class="fa-brands fa-github fa-2xl"></i>
          </a>
          </Button>
          <Button variant="primary">
            <a href={project.linkedin}>
          <i class="fa-solid fa-link fa-xl"></i>
          </a>
          </Button>
        </Modal.Footer>
      </Modal>}




    
    </>
  )
}

export default ProjectCard