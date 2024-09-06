import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index';
import '../admin.css'
import i1 from '../images/logo.png';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slidebar from './Slidebar';
import Cookies from 'js-cookie'

const AddAdmin = () => {
  const adname= Cookies.get('name')
  const [present,setPresent]=useState(false);
  useEffect(()=>{
    if(adname!==null || adname!==undefined){
        setPresent(true)
    }
  },[adname])
  const [data,setData]=useState({
    name:'',
    email:'',
    password:'',
  });
  const nav=useNavigate();
  const handleRegister=async (e)=>{
    e.preventDefault();
    try{
      console.log(data)
      await axios.post('http://localhost:3001/add_admin',data)
      .then(result=>{
        if(result.data.Status){
          nav('/dashboard')
        }
      })
    }catch(err){
      alert(err)
    }
  }
  return (
    <div style={{background:'#3939d9f2'}}>
      <Slidebar />
      <section className='page1' style={{maxHeight:'600px'}}>
        <div className='container1 form-component1 add-admin-form1'>
          <img src={i1} alt='logo' className='logo1' />
        <h2 className='form-title'>New Admin</h2>
        <form onSubmit={handleRegister}>

          <input type='text' placeholder='Name' value={data.name}
          onChange={(e)=>setData({...data,name:e.target.value})}/>
          <input type='email' placeholder='Email' value={data.email}
          onChange={(e)=>setData({...data,email:e.target.value})}/>
          <input type='password' placeholder='Enter Password' value={data.password}
          onChange={(e)=>setData({...data,password:e.target.value})}/>
          <div style={{justifyContent:'center',alignItems:'center',position:'relative',bottom:'1rem'}}>
          <button type='submit' style={{fontSize:'20px',background:'linear-gradient(140deg, #9083d5, #271776ca)',color:'white',
             padding: '5px',width:'fit-content'
          }}>Add</button>
          </div>
        </form>
        </div>
      </section>
    </div>
  )
}

export default AddAdmin