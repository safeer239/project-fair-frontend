import React from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';

function Header({insideDashboard}) {
  return (
    <div>
       <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'>
            <img
              src='https://static.vecteezy.com/system/resources/previews/000/351/782/original/vector-checklist-icon.jpg'
              height='30'
              alt=''
              loading='lazy'
            />
            Project Fair
          </MDBNavbarBrand>
          {
           insideDashboard && <div>
            <MDBBtn>Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></MDBBtn>
          </div>
          }
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Header