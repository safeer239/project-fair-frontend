import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import Myprojects from '../Components/Myprojects'
import Myprofile from '../Components/Myprofile'

function Dashboard() {
   
  
  const [uName,setUname]=useState([])

  useEffect(()=>{
    
    if (sessionStorage.getItem("token")){
      setUname(JSON.parse(sessionStorage.getItem("existingUser")))
    }
  },[])
  console.log(uName);
  return (
    <>
      <Header insideDashboard/>
      <Row >

        <h3 className='m-3'>Welcome {uName.username}</h3>
        <Col>
        {/* project */}
        <Myprojects/>
        </Col>
        <Col>
        {/* profile */}
        <Myprofile/>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard