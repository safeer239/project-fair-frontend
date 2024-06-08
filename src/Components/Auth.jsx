import { MDBBtn } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import { loginAPI, registerAPI } from '../services/allAPIs'


function Auth({register}) {
    const navigate = useNavigate()
    const registerForm =register?true:false

    const [userData,setUserData]=useState({
        username:"",
        email:"",
        password:""
    })
    // console.log(userData);

    const handleRegister=async(e)=>{
        e.preventDefault()

        const {username,email,password}=userData
        if(!userData.username||!userData.email||!userData.password){
            alert("Please fill the form")
        }
        else{
             // to store the user data
            const result=await registerAPI(userData)
            console.log(result);
            if(result.status===200){
                alert(`${result.data.username} has been registered`)
                setUserData({
                    username:"",
                    email:"",
                    password:""
                })
                navigate('/login')
            }
        }
    }

    const handleLogin = async(e)=>{
        e.preventDefault()
        if(!userData.email||!userData.password){
            alert("Please fill the form")
        }
        else{
             // to store the user data
            const result=await loginAPI(userData)
            console.log(result);
            if(result.status==200){
                alert( 'login successfull')
                //to set user details into sessionstorage
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                //to set token into sessionstorage
                sessionStorage.setItem("token",result.data.token)
                setUserData({
                    email:"",
                    password:""
                })
                navigate('/')
            }else{
                alert("Login failed")
            }
        }
    }
  return (
    <div>
        <Header/>
        <div style={{width:'100%',height:'550px'}} className='d-flex justify-content-center align-items-center'>
        <div className='container'>
            <Link className='text-decoration-none' to={'/'}>
            <i className='fa-solid fa-arrow-left'> Back to Home</i>
            </Link>
            <div className='card shadow p-5 bg-info'>
               <div className="row">

               <div className='col'>
                    <img width={'500px'} height={'350px'} src="https://static.vecteezy.com/system/resources/previews/002/437/945/large_2x/illustration-of-a-login-account-free-vector.jpg" alt="" />
                </div>

                <div className='col'>
                    <div className='d-flex justify-content-center flex-column'>
                        <h1><i class="fa-solid fa-laptop-code fa-fade fa-2xl mt-4 me-2"></i> Project Fair</h1>
                        <h5 className=' m-4 text-center'>
                            {
                              registerForm?'Sign up to your Account':'Sign in to your Account'  
                            }
                        </h5>
                        <form>
                            {
                                registerForm &&
                                <input type="text" value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} placeholder='Enter your Name' className='form-control mb-3' />
                            }
                                
                                   
                                    <input type="text" value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} placeholder='Enter your Email' className='form-control mb-3'/>
                                    <input type="password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} placeholder='Enter your Password' className='form-control mb-3'/>

                                 {  
                                 register?

                                    <div className='text-center m-3'>
                                        <MDBBtn onClick={(e)=>handleRegister(e)}>Register</MDBBtn>
                                        <Link className='text-decoration-none' to={'/login'}>
                                        <p className='m-3 text-dark '>Already have a Account? Please Login Here</p>
                                        </Link>
                                    </div>:
                                    <div className='text-center m-3'>
                                    <MDBBtn onClick={handleLogin}>Login</MDBBtn>
                                    <Link className='text-decoration-none' to={'/register'}>
                                    <p className='m-3 text-dark '>New to here? Please Register Here</p>
                                    </Link>
                                </div>

                                 }
                                
                                
                                

                            
                        </form>
                    </div>
                </div>

               </div>

            </div>

        </div>
    </div>
    </div>
  )
}

export default Auth