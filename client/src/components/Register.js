import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import axios from 'axios';

const Register = () => {
  const [data,setData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    nic:'',
    dob:'',
    gender:'',
    password:'',
  });
  const nav=useNavigate();
  const handleRegister=async (e)=>{
    e.preventDefault();
    try{
      console.log(data)
      await axios.post('http://localhost:3001/register',data)
      .then(result=>{
        if(result.data.Status){
          nav('/')
        }
      })
    }catch(err){
      alert(err)
    }
  }
  return (
    <div className='container form-component register-form'>
      <h2>Sign-Up</h2>
      <p>Please Sign-up to continue</p>
      <form onSubmit={handleRegister}>
        <div>
          <input type='text' placeholder='First Name' value={data.firstName}
          onChange={(e)=>setData({...data,firstName:e.target.value})}/><br />

          <input type='text' placeholder='Last Name'  value={data.lastName}
          onChange={(e)=>setData({...data,lastName:e.target.value})}/><br />
        </div>
        <div>
          
          <input type='email' placeholder='Enter Email' value={data.email}
          onChange={(e)=>setData({...data,email:e.target.value})}/><br />
          
          <input type='number' placeholder='Enter Phone No'  value={data.phone}
          onChange={(e)=>setData({...data,phone:e.target.value})}/><br />
        </div>
        <div>
          
          <input type='number' placeholder='Enter NIC' value={data.nic}
          onChange={(e)=>setData({...data,nic:e.target.value})}/><br />
          
          <input type='date'value={data.dob} placeholder='Date of Birth'
          onChange={(e)=>setData({...data,dob:e.target.value})}/><br />
        </div>
        <div>
          
          <select value={data.gender}
          onChange={(e)=>setData({...data,gender:e.target.value})}>
            <option value=''>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select><br />
          
          <input type='password' placeholder='Enter Password'  value={data.password}
          onChange={(e)=>setData({...data,password:e.target.value})}/><br />
        </div>
        <div style={{gap:'10px',justifyContent:'flex-end',flexDirection:'row'}}>
          <p style={{marginBottom:0,fontSize:'15px'}}>Already Registered?</p>
          <Link to={'/login'} style={{textDecoration:'none',alignItems:'center',fontSize:'15px'}}>Login Now</Link>
        </div><br />
        <div style={{justifyContent:'center',alignItems:'center',position:'relative',bottom:'1rem'}}>
          <button type='submit' style={{fontSize:'20px',background:'linear-gradient(140deg, #9083d5, #271776ca)',color:'white',
            padding: '5px',width:'fit-content'
          }}>Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register