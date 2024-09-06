import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../App.css'
import Cookies from 'js-cookie'
import axios from 'axios';

const Patient_login = () => {
  const [data,setData]=useState({
    email:'',
    password:''
  });
  const nav=useNavigate();
  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      await axios.post('http://localhost:3001/login',data)
      .then(result=>{
        if(result.data.loginStatus){
          const id=result.data.Result[0].Id
          Cookies.set('id',id,{expires:1})
          axios.put('http://localhost:3001/status-in',{id,stat:'In'})
          .then(result=>{
            if(result.data.Status){
              console.log(result.data.Result[0].Status)
            }
          }).catch(err=>console.log(err))
          nav('/'+id)
        }
      })
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div>
      <Link to="/" className='btn btn-info'><button className='btn' style={{background:'linear-gradient(140deg, #9083d5, #271776ca)',color:'white'}}>Back</button></Link>
    <div className='container form-compoent login-form'>
      <h2>Sign-In</h2><br />
      <p>Please Login to continue</p><br />
      <form onSubmit={handleLogin}>
        <label>Email:</label><br />
        <input type='email' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}
        style={{  flex: 1,fontSize: '20px',padding: '7px',borderRadius: '7px',
          border: '1px solid gray'}} /><br /><br />
        <label>Password:</label><br />
        <input type='password' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} 
         style={{  flex: 1,fontSize: '20px',padding: '7px',borderRadius: '7px',
          border: '1px solid gray'}}/><br /><br />
        <div style={{gap:'10px',justifyContent:'flex-end',flexDirection:'row'}}>
          <p style={{marginBottom:0,fontSize:'15px'}}>Not Registered?
          <Link to={'/register'} style={{textDecoration:'none',alignItems:'center',fontSize:'15px'}}>Register Now</Link></p>
        </div><br />
        <div style={{gap:'10px',justifyContent:'flex-end',flexDirection:'row'}}>
          <p style={{marginBottom:0,fontSize:'15px'}}>Are you a staff?
          <Link to={'/deptlogin'} style={{textDecoration:'none',alignItems:'center',fontSize:'15px'}}>Click here</Link></p>
        </div><br />
        <div style={{justifyContent:'center',alignItems:'center'}}>
          <button type='submit' style={{fontSize:'20px',background:'linear-gradient(140deg, #9083d5, #271776ca)',color:'white',
             padding: '5px',width:'fit-content'
          }}>Login</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Patient_login