import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../admin.css'
import { Link, Navigate } from 'react-router-dom';
import Slidebar from './Slidebar';
import Cookies from 'js-cookie'

const Doctors = () => {
  const [doctors,setDoctors]=useState([]);
  const adname= Cookies.get('name')
  const [nameFilter, setNameFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [present,setPresent]=useState(false);
  useEffect(()=>{
    if(adname!==null || adname!==undefined){
        setPresent(true)
    }
  },[adname])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  useEffect(()=>{
    const getDoc=async ()=>{
      await axios.get('http://localhost:3001/doctors')
      .then(result=>{
        if(result.data.Status){
          setDoctors(result.data.Result)
        }else{
          console.log(result.data.Error)
        }
      })
    };
    getDoc();
  },[])
  const handleDelete=(id)=>{
    axios.delete('http://localhost:3001/delete_doctor/'+id)
    .then(result=>{
        if(result.data.Status){
            window.location.reload()
        }else {
            alert(result.data.Error)
        }
    })
}
const filteredDoc = doctors.filter(doc => {
  const matchesName = doc.Name.toLowerCase().includes(nameFilter.toLowerCase());
  const matchesDept = doc.Department.toLowerCase().includes(deptFilter.toLowerCase());
  return matchesName && matchesDept;
});
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDoc.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDoc.length / itemsPerPage);
  return (
    <div style={{background:'#3939d9f2'}}>
      <Slidebar />
      <div className='px-5 mt-5 page1' style={{background:'white',marginLeft:'150px',height:'500px'}}>
            <div className='d-flex justify-content-center'>
                <h3 style={{marginLeft:'35%'}}>DOCTORS</h3>
            </div>
            <div className='mt-3' style={{marginTop:'30px'}}>
              <div className='d-flex mb-3'>
                <p style={{marginLeft:'30px',marginTop:'-5px',gap:'10px'}}>Name: <input
                  type='text'
                  placeholder='Filter by name'
                  className='form-control me-2'
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                /></p>
                <p  style={{marginLeft:'300px',marginTop:'-25px',position:'absolute'}}>Department: <input
                  type='text'
                  placeholder='Filter by department'
                  className='form-control me-2'
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                /></p>
              </div>
            <table className='table' style={{width:'100%',marginTop:'3%'}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Phone</th>
                        <th>DOB</th>
                        <th>Department</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {
                         doctors && doctors.length >0 ? (currentItems.map(e=>(
                            <tr>
                                <td style={{paddingLeft:'50px'}}>{e.Name}</td>
                                <td style={{paddingLeft:'25px'}}><img src={'http://localhost:3001/Images/'+e.Image} 
                                className='emp_img'  style={{
                                  width:'40px',
                                  height: '40px',
                                  borderRadius: '50%'
                              }} alt="" /></td>
                                <td style={{paddingLeft:'25px'}}>{e.Phone}</td>
                                <td style={{paddingLeft:'25px'}}>{e.DOB}</td>
                                <td style={{paddingLeft:'25px'}}>{e.Department}</td>
                                <td style={{paddingLeft:'25px'}}>{e.Gender}</td>
                                <td>
                                    <Link to={'/admin_dashboard/view_doctor/'+e.Id} className='btn btn-info btn-sm me-2'>View</Link>
                                    <button className='btn btn-warning btn-sm' onClick={()=>handleDelete(e.Id)}>Delete</button>
                                </td>
                            </tr>
                         ))): <h1>Doctors are not registered!</h1>
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

export default Doctors