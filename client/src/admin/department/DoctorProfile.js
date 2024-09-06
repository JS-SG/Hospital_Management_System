import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import Sidebar from './Sidebar'; // Assuming you have a Sidebar component

const DoctorProfile = () => {
    var staffname = Cookies.get('dname')
    const [show, setShow] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [doctor, setDoctor] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [deptFilter, setDeptFilter] = useState('');

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
    useEffect(() => {
        if(show){
        const getDoctor = async () => {
                await axios.get('http://localhost:3001/doctor_profile',{params:{staffname}})
                .then(result=>{
                    if (result.data.Status) {
                        setDoctor(result.data.Result[0]);
                    } else {
                        console.log(result.data.Error);
                    }
                })
                .catch (error=>{
                    console.error('Error fetching doctor data:', error);
                })
            };
        getDoctor();
        }
        else{
        const getDoctors=async ()=>{
            await axios.get('http://localhost:3001/doctors_profile',{params:{staffname}})
            .then(result=>{
                if(result.data.Status){
                    setDoctors(result.data.Result);
                }
                else {
                    console.log(result.data.Error);
                }
            })
            .catch(error=>{
                console.error('Error fetching doctor data:', error);
            });
        };getDoctors();
    }
    }, [show]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = doctors.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(doctors.length / itemsPerPage);


    return (
        <div style={{ background: '#3939d9f2' }}>
            <Sidebar />
            <section className='page1 doctors' style={{ maxHeight: '510px',width:'85%'}}>
                {show ? (
                    
                        <>
                            <img
                                src={'http://localhost:3001/Images/' + doctor.Image}
                                className='emp_img'
                                style={{
                                    width: '100px',
                                    height: '90px',
                                    position: 'absolute',
                                    zIndex: '10',
                                    marginLeft: '37%',
                                    top: '20%'
                                }}
                                alt={doctor.Name}
                            />
                            <div className='banner'>
                                <div className='card' style={{ marginTop: '45px', height: '100px', position: 'fixed', width: '80%' }}>
                                    <h4 style={{ marginTop: '80px' }}>{doctor.Name}</h4>
                                    <div className='details'>
                                        <p>Email: <span>{doctor.Email}</span></p>
                                        <p>Phone: <span>{doctor.Phone}</span></p>
                                        <p>DOB: <span>{doctor.DOB}</span></p>
                                        <p>Department: <span>{doctor.Department}</span></p>
                                        <p>Gender: <span>{doctor.Gender}</span></p>
                                    </div>
                                </div>
                            </div>
                        </>
                    
                ) : (
                    <div className='px-5 mt-5' style={{ background: 'white', marginLeft: '3%', height: '90%' }}>
                        <div className='d-flex justify-content-center'>
                            <h3 style={{ marginLeft: '35%' }}>DOCTORS</h3>
                        </div>
                        <div className='mt-3' style={{ marginTop: '30px' }}>
                            <div className='d-flex mb-3'>
                                <p style={{ marginLeft: '30px', marginTop: '-5px', gap: '10px' }}>Name: <input
                                    type='text'
                                    placeholder='Filter by name'
                                    className='form-control me-2'
                                    value={nameFilter}
                                    onChange={(e) => setNameFilter(e.target.value)}
                                /></p>
                                <p style={{ marginLeft: '300px', marginTop: '-25px', position: 'absolute' }}>Department: <input
                                    type='text'
                                    placeholder='Filter by department'
                                    className='form-control me-2'
                                    value={deptFilter}
                                    onChange={(e) => setDeptFilter(e.target.value)}
                                /></p>
                            </div>
                            <table className='table' style={{ width: '100%', marginTop: '3%' }}>
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
                                    { currentItems.map(e => (
                                        <tr key={e.Id}>
                                            <td style={{ paddingLeft: '50px' }}>{e.Name}</td>
                                            <td style={{ paddingLeft: '25px' }}><img src={'http://localhost:3001/Images/' + e.Image}
                                                className='emp_img' style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%'
                                                }} alt="" /></td>
                                            <td style={{ paddingLeft: '25px' }}>{e.Phone}</td>
                                            <td style={{ paddingLeft: '25px' }}>{e.DOB}</td>
                                            <td style={{ paddingLeft: '25px' }}>{e.Department}</td>
                                            <td style={{ paddingLeft: '25px' }}>{e.Gender}</td>
                                            <td>
                                                <Link to={'/admin_dashboard/view_doctor/' + e.Id} className='btn btn-info btn-sm me-2'>View</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </section>
            <div className='pagination' style={{ margin: '20px', display: 'flex', justifyContent: 'center' }}>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button key={index} className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                            ))}
            </div>
        </div>
    );
};

export default DoctorProfile;
