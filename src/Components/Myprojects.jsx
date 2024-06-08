import { MDBBtn,MDBInput } from 'mdb-react-ui-kit'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectAPI,  deleteUserProjectsAPI,  editUserProjectAPI,  getUserProjectsAPI } from '../services/allAPIs';



function Myprojects() {
  const [projectId,SetProjectId]=useState("")
  const[isEdit,setIsEdit]=useState(false)

  const [userProjects,setUserProjects]=useState([])
  const getAllProjects=async()=>{
    if(sessionStorage.getItem("token")){
     const token= sessionStorage.getItem("token")
     const reqHeader={
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      }
      const result=await getUserProjectsAPI(reqHeader)
      if(result.status === 200){
        setUserProjects(result.data)
      }
      else{
        alert("Error getting projects")
      }
    }
    else{
      alert("Error getting token")
    }
  }
  

  useEffect(()=>{
    getAllProjects()

  },[])
  console.log(userProjects)

  const [token,setToken]=useState("")//to hold token

  const [projectDetails,setProjectDetails]=useState({
    title:"",
    language:"",
    projectImg:"",
    github:"",
    linkedin:"",
    overview:""
  })

  //to hold image url
  const [imagePreview,setImagePreview]=useState()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setProjectDetails({
      title:"",
      language:"",
      github:"",
      linkedin:"",
      overview:"",
      projectImg:""
    })
    setImagePreview("")
  };

  const handleAdd=async(e)=>{
    e.preventDefault()
    //logic for adding the details from project modal
    const {title,language,github,linkedin,overview,projectImg} = projectDetails

    if(!title||!language||!github||!linkedin||!overview||!projectImg){
      alert("Please fill the form")
    }
    else{
       const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      reqBody.append("overview",overview)
      reqBody.append("projectImg",projectImg)

      //creation of request header
      if(token){
        var reqHeader={
          "Content-Type":"multipart/form-data",//image data
          "Authorization":`Bearer ${token}`//token is appended to the request header
        }
      
      
      //api call
      const result =await addProjectAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status==200){
        console.log(result.data);
        alert('Project added successfully')
        handleClose()
      }
      else{
        console.log(result.response.data);
      }
    }
    }
  }

  //delete
  const handleDelete=async(id)=>{
    if(sessionStorage.getItem("token")){
     const token= sessionStorage.getItem("token")
     const reqHeader={
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      }
      const result=await deleteUserProjectsAPI(id,reqHeader)
      if(result.status == 200){
        alert('Deleted successfully')
        getAllProjects()
        
      }
      else{
        alert("Error deleting project")
      }
    }
    else{
      alert("Error getting token")
    }
  }

  //edit
  const handleEdit =async()=>{
    if(sessionStorage.getItem("token")){
     const token= sessionStorage.getItem("token")
     const reqHeader={
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      }
      const reqBody=projectDetails
      const id = projectId
      const result=await editUserProjectAPI(id,reqBody,reqHeader)
      if(result.status == 200){
        alert('edit successfully')
        getAllProjects()
        handleClose()
        
      }
      else{
        alert("Error editing project")
      }
    }
    else{
      alert("Error getting token")
    }
  }


useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setToken(sessionStorage.getItem("token"));
  }
  else{
    setToken("")
  }
},[])
  useEffect(()=>{
    if(projectDetails.projectImg){
      //convert projectimg into url
      setImagePreview(URL.createObjectURL(projectDetails.projectImg))
    }
  },[projectDetails.projectImg])
  return (
    <>
      <div className='card shadow p-3 m-4 '>
        <h3>My Projects</h3>
        <div className='ms-auto'>
          <MDBBtn  onClick={handleShow}>Add Project</MDBBtn>
        </div>
        {
        userProjects?.map(data=>(
             <div className='border border-2 p-3 d-flex align-items-center m-2'>
             <h4>{data.title}</h4>
             <div style={{marginLeft:'180px'}}>
               <MDBBtn onClick={(e)=>{handleShow()
              setIsEdit(true)
              SetProjectId(data._id)}} className='m-3'><i class="fa-regular fa-pen-to-square"></i></MDBBtn>
               <MDBBtn className='m-3'><i class="fa-brands fa-github"></i></MDBBtn>
               <MDBBtn onClick={(e)=>handleDelete(data._id)} className='m-3'><i class="fa-solid fa-trash"></i></MDBBtn>
             </div>
           </div>
         )) }
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
          <Col>
          <label>
          <input onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} type="file" style={{display:'none'}} />
            <img width={'400px'} src={imagePreview?imagePreview:"https://static.vecteezy.com/system/resources/previews/000/273/730/original/project-management-icon-set-vector.jpg"} alt="" />
            </label>
          </Col>
         
          <Col>
          <div className='m-3'>
        <MDBInput value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} className='mb-3' label='Project Title' id='form1' type='text' />
        <MDBInput value={projectDetails.language} onChange={e=>setProjectDetails({...projectDetails,language:e.target.value})}   className='mb-3'  label='Language to be used' id='form1' type='text' />
        <MDBInput value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})}  className='mb-3' label='Enter your Github link' id='form1' type='text' />
        <MDBInput value={projectDetails.linkedin} onChange={e=>setProjectDetails({...projectDetails,linkedin:e.target.value})}  className='mb-3' label='Enter your LinkedIn link' id='form1' type='text' />
        <MDBInput value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})}  className='mb-3' label='Project Overview' id='form1' type='text' />


        <div className='text-center'>
         </div>
        </div>
          </Col>
        </Row>
        </Modal.Body>
        <Modal.Footer>
          {isEdit? 
          <Button variant="secondary" onClick={handleEdit}>
            Update
          </Button>:
          <Button variant="primary" onClick={handleAdd} >Add</Button>}
        </Modal.Footer>
      </Modal>
      </div> 
    </>
  )
}

export default Myprojects

