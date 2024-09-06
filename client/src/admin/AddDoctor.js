import React, {useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import '../admin.css'
import Cookies from 'js-cookie'
import i2 from '../images/doctors/docHolder.jpg'
import i1 from '../images/logo.png';
import axios from 'axios';
import Slidebar from './Slidebar.js';

const AddDoctor = () => {
  const adname= Cookies.get('name')
  const [present,setPresent]=useState(false);
  useEffect(()=>{
    if(adname!==null || adname!==undefined){
        setPresent(true)
    }
  },[adname])
  const [docAvatar,setDocAvatar]=useState('')
  const [docImg,setDocImg]=useState('')
  const handleAvatar= async (e)=>{
    const file=e.target.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      setDocAvatar(reader.result);
      setDocImg(file)
    }
  }
  const [data,setData]=useState({
    name:'',
    email:'',
    phone:'',
    dob:'',
    gender:'',
    department:'',
    password:'',
  });
  const nav=useNavigate();
  const handleRegister=async (e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('name',data.name);
    formData.append('email',data.email);
    formData.append('phone',data.phone);
    formData.append('dob',data.dob);
    formData.append('gender',data.gender);
    formData.append('department',data.department);
    formData.append('password',data.password);
    formData.append('image',docImg);
    try{
      console.log(data)
      await axios.post('http://localhost:3001/add_doctor',formData)
      .then(result=>{
        if(result.data.Status){
          nav('/doctors')
        }
      })
    }catch(err){
      alert(err)
    }
  }
  const dept=['Select Department','Pediatrics','Orthopedics','Cardiology','Neurology','Oncology',
    'Radiology','Physical Therapy','Dermatology','ENT'];
  return (
    <div style={{background:'#3939d9f2'}}>
    <Slidebar />
    <section className='page1'>
    <div className='container1 form-component1 add-doctor-form1'>
      <img src={i1} alt='logo' className='logo1' />
      <h2>Add Doctor</h2>
      <form onSubmit={handleRegister}>
        <div className='first-wrapper'> 
          <div>
            <img src={docAvatar ? `${docAvatar}` : {i2}} alt='Doctor Avatar' />
          </div>
        <div>
          <input type='file' onChange={handleAvatar}/>

          <input type='text' placeholder='Name' value={data.name}
          onChange={(e)=>setData({...data,name:e.target.value})}/>

          <input type='email' placeholder='Enter Email' value={data.email}
          onChange={(e)=>setData({...data,email:e.target.value})}/>

          <input type='number' placeholder='Enter Phone No'  value={data.phone}
          onChange={(e)=>setData({...data,phone:e.target.value})}/>
          
          <input type='date'value={data.dob} placeholder='Date of Birth'
          onChange={(e)=>setData({...data,dob:e.target.value})}/>
          
          <select value={data.gender}
          onChange={(e)=>setData({...data,gender:e.target.value})}>
            <option value=''>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
          
          <select 
            onChange={(e)=>{setData({...data,department:e.target.value})}}>
                {
                    dept.map((dep,index)=>{
                        return (
                            <option value={dep} key={index}>{dep}</option>
                        )
                    })
                }
            </select>

            <input type='password' placeholder='Enter Password'  value={data.password}
              onChange={(e)=>setData({...data,password:e.target.value})}/><br />
        </div>
        </div>
        <div style={{justifyContent:'center',alignItems:'center',position:'relative',bottom:'1rem'}}>
          <button type='submit' style={{fontSize:'20px',background:'linear-gradient(140deg, #9083d5, #271776ca)',color:'white',
             padding: '5px',width:'fit-content'
          }}>Add Doctor</button>
        </div>
      </form>
    </div>
    </section>
    </div>
  )
}

export default AddDoctor