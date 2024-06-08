import { MDBBtn } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProjectImg from '../Assets/projectImg.jpg'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'
import { getHomeProjectsAPI } from '../services/allAPIs'




function Home() {
  //to hold the 3 projects details
  const [homeProject,setHomeProject]=useState([])

  //to hold login status
    const [isLoggeIn,setIsLoggedIn] =useState(false)

    const getHomeProjects =async()=>{
      const result = await getHomeProjectsAPI()
      if(result.status==200){
        setHomeProject(result.data)
      }
      else{
        alert('Cannot get the home project')
      }
    }
console.log(homeProject)

useEffect(()=>{ 
  getHomeProjects()
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }
},[])
  return (
    <>
    <Header/>
      <div className="container">
        <Row>
          <Col className='m-4'>
          <h1 className='mt-3'> Project Fair </h1>
          <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At veniam repellendus quam tenetur blanditiis reprehenderit tempore suscipit, illo, fugiat deleniti explicabo mollitia eaque qui placeat unde labore ipsa ad voluptatibus.
          At blanditiis, reprehenderit veniam recusandae alias officiis quae excepturi repellat accusamus beatae iure, placeat, sunt voluptatibus. Veritatis labore quibusdam, harum quod quae incidunt blanditiis, aliquam perspiciatis similique ullam, ducimus magni?
          Similique odio nesciunt impedit quidem facere nam, itaque officia voluptas enim autem porro accusantium voluptatum in illo inventore quam error illum incidunt minus. Doloremque, dicta soluta voluptates necessitatibus consequuntur dolorem.</p>
          
          {isLoggeIn?
          <Link to={'/dashboard'} className='text-decoration-none'>
          <MDBBtn>Manage your projects</MDBBtn>
          </Link>
            :
          <Link to={'/login'} className='text-decoration-none'>
          <MDBBtn>Get Started</MDBBtn>
          </Link>}
          </Col>
          <Col>
          <img src={ProjectImg} width={'100%'} className='m-5' alt="" />
          </Col>
        </Row>
          <h1 className='text-center m-3'>Explore Our Projects</h1>
          <marquee scrollAmount={15}>
        <div className='d-flex gap-5'>
          {
            homeProject.length>0?homeProject.map(project=>(
              <div >
              <ProjectCard project={project}/>
              </div>
            )):null
          }
          
        </div>
        </marquee>
        <Link to={'/project'} className='text-decoration-none'>
        <h4 className='text-center m-4'>View More</h4>
        </Link>
      </div>
    </>
  )
}

export default Home