import React, {useEffect, useState } from 'react'
import Slidebar from './Slidebar'
import '../admin.css'
import i1 from '../images/doctors/doc.png'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import {GoCheckCircleFill} from 'react-icons/go'
import {AiFillCloseCircle} from 'react-icons/ai'

const Dashboard = () => {
  const adname= Cookies.get('name')
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [present,setPresent]=useState(false); 
  useEffect(()=>{
    if(adname!==null || adname!==undefined){
        setPresent(true)
    }
  },[adname])
  const [appointment,setAppointment]=useState([])
  useEffect(()=>{
    const getAppointment=async ()=>{
      await axios.get('http://localhost:3001/appointment')
      .then(result=>{
        if(result.data.Status){
          setAppointment(result.data.Result)
        }
        else{
          console.log(result.data.Error)
        }
      })
    };
    getAppointment();
  },[]);
  const handleStatus=async (id,status)=>{
    await axios.put('http://localhost:3001/appointment/'+id,{status})
    .then(result=>{
      if(result.data.Status){
        setAppointment((prev) => 
          prev.map((appointment) => 
            appointment.Id === id ? { ...appointment, status } : appointment
          )
        );
        
        alert('Status updated');
        window.location.reload();
      }
      else{
        console.log(result.data.Error)
      }
    });
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = appointment.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(appointment.length / itemsPerPage);
  return (
    <div style={{background:'#3939d9f2'}}>
      <Slidebar />
      <section className='dashboard1 page1 col p-0 m-0' style={{maxHeight:'525px'}}>
        <div className='banner'>
          <div className='firstBox'>
            <img src={i1} alt='docImg' />
            <div className='content'>
              <div>
                <p>Hello ,</p>
                <h5>{adname}</h5>
              </div>
              <p>
                Welcome to GM Hospital
              </p>
            </div>
          </div>
          <div className='secondBox'>
            <p>Total Appointments:</p>
            <h3>1500</h3>
          </div>
          <div className='thirdBox'>
            <p>Registered Doctors:</p>
            <h3>25</h3>
          </div>
        </div>
      </section>
      <div className='pagination' style={{margin: '20px',display: 'flex', justifyContent: 'center'}}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index} className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
            ))}
          </div>
    </div>
  )
}

export default Dashboard