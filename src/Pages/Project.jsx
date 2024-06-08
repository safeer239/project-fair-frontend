import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import Header from '../Components/Header'
import { getAllProjectsAPI } from '../services/allAPIs'

function Project() {

  const [searchKey,setSearchKey] =useState("")

  const [allProjects,setAllProjects]=useState([])
  const getAllProjects=async()=>{
    if(sessionStorage.getItem("token")){
     const token= sessionStorage.getItem("token")
     const reqHeader={
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      }
      const result=await getAllProjectsAPI(searchKey,reqHeader)
      if(result.status === 200){
        setAllProjects(result.data)
      }
      else{
        alert("Error getting projects")
      }
    }
    else{
      alert("Error getting token")
    }
  }
  console.log(allProjects)
  useEffect(()=>{
    getAllProjects()
  },[searchKey])
  return (
   <>
   <Header/>
    <div className='text-center container '>
           <h1 className='m-5'>All Projects</h1>
     <div className=' text-center container d-flex justify-content-center w-50'>
      <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className='form-control m-3 ' placeholder='Search by Technologies' />
           <i style={{marginLeft:'-40px'}} class="fa-solid fa-magnifying-glass mt-4"></i>
     </div>
     <Row>
      {
        allProjects.length>0?allProjects.map(project=>(
<Col xs={3} className='p-3'>
      <ProjectCard project={project} />
      </Col>
        )):"Null"
      }
      
     </Row>
    </div>
   </>
  )
}

export default Project