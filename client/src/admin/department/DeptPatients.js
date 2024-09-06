import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../../admin.css'
import Cookies from 'js-cookie'
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const DeptPatients = () => {
    const [patients,setPatients]=useState([]);
    const staffname= Cookies.get('dname')
    const [show,setShow]=useState(true)
    useEffect(()=>{
        if(staffname === 'Cardiology'){
            setShow(false);
        }
      },[staffname])
    const [nameFilter, setNameFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    useEffect(()=>{
      const getPatients=async ()=>{
        await axios.get('http://localhost:3001/patient')
        .then(result=>{
          if(result.data.Status){
            setPatients(result.data.Result)
          }else{
            console.log(result.data.Error)
          }
        })
      };
      getPatients();
    },[])
  const filteredPatient = patients.filter(patient => {
    const fname = patient.Fname || ''; 
    const date = patient.Date || ''; 
    const matchesFname = fname.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesDate = date.toLowerCase().includes(dateFilter.toLowerCase());
    return matchesFname && matchesDate;
  });
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPatient.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPatient.length / itemsPerPage);
    return (
      <div style={{background:'#3939d9f2'}}>
        <Sidebar />
        <div className='px-5 mt-5 page1' style={{background:'white',marginLeft:'150px',height:'500px'}}>
              <div className='d-flex justify-content-center'>
                  <h3 style={{marginLeft:'35%'}}>PATIENTS</h3>
              </div>
            <Link to="/dept_dashboard/appointments" className='btn btn-success'>Appointments</Link>
              <div className='mt-3' style={{marginTop:'30px'}}>
                <div className='d-flex mb-3'>
                  <p style={{marginLeft:'30px',marginTop:'-5px',gap:'10px'}}>Name: <input
                    type='text'
                    placeholder='Filter by name'
                    className='form-control me-2'
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                  /></p>
                  <p  style={{marginLeft:'300px',marginTop:'-25px',position:'absolute'}}>Date: <input
                    type='text'
                    placeholder='dd-mm-yyyy'
                    className='form-control me-2'
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  /></p>
                </div>
              <table className='table' style={{width:'100%',marginTop:'3%'}}>
                  <thead>
                      <tr>
                          <th style={{paddingRight:'25px'}}>First Name</th>
                          <th style={{paddingRight:'10px'}}>Last Name</th>
                          <th style={{paddingRight:'10px'}}>Gender</th>
                          <th style={{paddingRight:'30px'}}>Last Visit</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                           show ? (currentItems.filter(p=>p.Doctor_Name === staffname).map(e=>(
                              <tr>
                                  <td style={{paddingLeft:'80px'}}>{e.Fname}</td>
                                  <td style={{paddingLeft:'50px'}}>{e.Lname}</td>
                                  <td style={{paddingLeft:'25px'}}>{e.Gender}</td>
                                  <td style={{paddingLeft:'60px'}}>{e.Date}</td>
                                  <td>
                                      <Link to={'/view_patient/'+e.Id} className='btn btn-info btn-sm me-2'>View</Link>
                                  </td>
                              </tr>
                           ))): (currentItems.filter(p=>p.Department === staffname).map(e=>(
                            <tr>
                                <td style={{paddingLeft:'80px'}}>{e.Fname}</td>
                                <td style={{paddingLeft:'50px'}}>{e.Lname}</td>
                                <td style={{paddingLeft:'25px'}}>{e.Gender}</td>
                                <td style={{paddingLeft:'60px'}}>{e.Date}</td>
                                <td>
                                    <Link to={'/view_patient/'+e.Id} className='btn btn-info btn-sm me-2'>View</Link>
                                </td>
                            </tr>
                         )))
                      }
                  </tbody>
              </table>
              </div>
          </div>
  
        <div className='pagination' style={{margin: '20px',display: 'flex', justifyContent: 'center'}}>
          {Array.from({ length: totalPages }, (_, index) => (
              <button key={index} className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
          ))}
      </div>
      </div>
    )
}

export default DeptPatients