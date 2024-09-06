import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import '../../admin.css'
import i1 from '../../images/doctors/doc.png'
import {GoCheckCircleFill} from 'react-icons/go'
import {AiFillCloseCircle} from 'react-icons/ai'
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const DeptDashboard = () => {
    const staffname= Cookies.get('dname')
    const [show,setShow]=useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    useEffect(()=>{
      const dept=async ()=>{
        await axios.get('http://localhost:3001/department')
        .then(result=>{
          if(result.data.Status){
           const arr=result.data.Result 
           const check=arr.some(val=>val.Name === staffname)
           if(check){
            setShow(false)
           }
           else{
             const doc=async()=>{
                await axios.get('http://localhost:3001/doctors')
                .then(result=>{
                  if(result.data.Status){
                    const arr=result.data.Result 
                    const check=arr.some(val=>val.Name === staffname)
                    if(check){
                      setShow(true)
                    }
                }})
             };doc();
           }
          }
        })
      };dept();
    })
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
    const handleStatus=async (id,status,pid,email,date)=>{
      await axios.put('http://localhost:3001/appointment/'+id,{status,pid,email,date})
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
        <Sidebar />
        <section className='dashboard1 page1 col p-0 m-0' style={{maxHeight:'525px'}}>
          <div className='banner'>
            <div className='firstBox'>
              <img src={i1} alt='docImg' />
              <div className='content'>
                <div>
                  <p>Hello ,</p>
                  <h5>{staffname}</h5>
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
          {!show ?(
          <div className='banner'>
            <h5>Appointments</h5>
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Visited</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentItems.filter(app=>app.Status === null && app.Department === staffname).map(app=>{
                    return(
                      <tr key={app.Id}>
                        <td>{`${app.Patient_Fname} ${app.Patient_Lname}`}</td>
                        <td>{app.Date}</td>
                        <td>{app.Doctor_Name}</td>
                        <td>{app.Department}</td>
                        <td>
                          <select className={app.Status ==='Pending'?'value-pending':
                            app.Status==='Rejected'?'value-rejected':'value-accepted'}
                            value={app.Status} onChange={(e)=>handleStatus(app.Id,e.target.value,app.Patient_Id,app.Email,app.Date)}>
                            <option value='Pending' className='value-pending'>Pending</option>
                            <option value='Accepted' className='value-accepted'>Accepted</option>
                            <option value='Rejected' className='value-rejected'>Rejected</option>
                          </select>
                        </td>
                        <td>{app.Visited === true ? <GoCheckCircleFill className='green' /> : 
                          <AiFillCloseCircle className='red' />}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>) : (
            <div>
                <Link to='/dept_dashboard/appointments'><button 
                    style={{background:'blue',padding:'5px',color:'white',cursor:'pointer'}}>
                    Go to Appointments</button></Link>
            </div>
          ) }
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

export default DeptDashboard