import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'

const AppointmentForm = () => {
    const [data,setData]=useState({
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        nic:'',
        dob:'',
        gender:'',
        date:'',
        dept:'',
        doctor:'',
        address:'',
        hasVisited:''
    });
    const nav=useNavigate();
    const [hasVisited,setHasVisited]=useState('')
    const dept=['Select','Pediatrics','Orthopedics','Cardiology','Neurology','Oncology',
        'Radiology','Physical Therapy','Dermatology','ENT'];
    const [doc,setDoc]=useState([])
    useEffect(()=>{
        const getDoc=async ()=>{
           await axios.get('http://localhost:3001/doctors')
            .then(result=>{
                if(result.data.Status){
                    setDoc(result.data.Result)
                }
                else{
                    console.log(result.data.Error)
                }
            })
        }
        getDoc();
    },[])
    const handleAppointment=async (e)=>{
        e.preventDefault();
        try{
          const visit=Boolean(hasVisited);
          data.hasVisited=visit;
          await axios.post('http://localhost:3001/appointment',data)
          .then(result=>{
            if(result.data.Status){
              alert('Appointment fixed')
              nav('/')
            }else{
              alert('Appointment failed')
            }
          })
        }catch(err){
          console.log(err)
        }
    }

    return (
        <div className='container form-component appointment-form'>
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment} >
          <div>
            <input type='text' placeholder='First Name' value={data.firstName}
            onChange={(e)=>setData({...data,firstName:e.target.value})}/>
  
            <input type='text' placeholder='Last Name'  value={data.lastName}
            onChange={(e)=>setData({...data,lastName:e.target.value})}/>
          </div>
          <div>
            
            <input type='email' placeholder='Enter Email' value={data.email}
            onChange={(e)=>setData({...data,email:e.target.value})}/>
            
            <input type='number' placeholder='Enter Phone No'  value={data.phone}
            onChange={(e)=>setData({...data,phone:e.target.value})}/>
          </div>
          <div>
            
            <input type='number' placeholder='Enter NIC' value={data.nic}
            onChange={(e)=>setData({...data,nic:e.target.value})}/>
            
            <input type='date'value={data.dob} placeholder='Date of Birth'
            onChange={(e)=>setData({...data,dob:e.target.value})}/>
          </div>
          <div>
          <select value={data.gender}
            onChange={(e)=>setData({...data,gender:e.target.value})}>
              <option value=''>Select Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
            <input type='date'value={data.date} placeholder='Date of Appointment'
            onChange={(e)=>setData({...data,date:e.target.value})}/>
          </div>
          <div>
          <select 
            onChange={(e)=>{setData({...data,dept:e.target.value,doctor:''})}}>
                {
                    dept.map((dep,index)=>{
                        return (
                            <option value={dep} key={index}>{dep}</option>
                        )
                    })
                }
            </select>
            <select  onChange={(e)=>setData({...data,doctor:e.target.value})} disabled={!data.dept}>
              <option value=''>Select Doctor</option>
              {
                doc.filter(doc=>doc.Department === data.dept).map((doc,index)=>{
                  return(
                    <option value={doc.Name} key={index}>{doc.Name}</option>
                  )
                })
              }
            </select>
          </div>
          <textarea rows="2" value={data.address}  onChange={(e)=>setData({...data,address:e.target.value})} 
            placeholder='Enter Address'></textarea>
          <div style={{gap:'10px',justifyContent:'flex-end',flexDirection:'row'}}>
            <p style={{marginBottom:0,fontSize:'15px'}}>Have you visited before?</p>
            <input type='checkbox' checked={hasVisited} 
            onChange={(e)=>setHasVisited(e.target.checked)}
            style={{flex:'none',width:'2%'}}/>
          </div>
          <div style={{justifyContent:'center',alignItems:'center',position:'relative',bottom:'1rem'}}>
            <button type='submit' style={{fontSize:'20px',background:'linear-gradient(140deg, #9083d5, #271776ca)',color:'white',
               padding: '5px',width:'fit-content'
            }}>Get Appointment</button>
          </div>
        </form>
      </div>
    )
}

export default AppointmentForm