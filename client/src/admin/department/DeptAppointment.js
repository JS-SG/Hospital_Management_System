import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import '../../admin.css'
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';


const DeptAppointment = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const staffname= Cookies.get('dname')
    const [show,setShow]=useState(true);
    useEffect(()=>{
        if(staffname === 'Cardiology'){
            setShow(false);
        }
      },[staffname])
    const itemsPerPage = 5;
    const [appointment, setAppointment] = useState([])
    const dt = new Date()
    const date = dt.toISOString().split('T')[0];
    const dateParts = date.split('-');
    const [year, month, day] = dateParts;
    const curDate = `${day}-${month}-${year}`;
    useEffect(() => {
        const getAppointment = async () => {
            await axios.get('http://localhost:3001/appointment')
                .then(result => {
                    if (result.data.Status) {
                        setAppointment(result.data.Result)
                    }
                    else {
                        console.log(result.data.Error)
                    }
                })
        };
        getAppointment();
    }, []);
    const handleVisit = (id) => {
        axios.put('http://localhost:3001/patient/'+id)
            .then(result => {
                if (result.data.Status) {
                    window.location.reload()
                } else {
                    console.log(result.data.Error)
                }
            })
    }
    const handleNotVisit = (id) => {
        axios.delete('http://localhost:3001/delete_appointment/'+id)
            .then(result => {
                if (result.data.Status) {
                    window.location.reload()
                } else {
                    alert(result.data.Error)
                }
            })
    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = appointment.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(appointment.length / itemsPerPage);
    return (
        <div style={{ background: '#3939d9f2' }}>
            <Sidebar />
            <div className='px-5 mt-5 page1' style={{ background: 'white', marginLeft: '150px', height: '500px' }}>
                <div className='d-flex justify-content-center'>
                    <h3 style={{ marginLeft: '35%' }}>TODAY'S APPOINTMENTS</h3>
                </div>
                <Link to="/dept_dashboard/patients" className='btn btn-success'>Back</Link>
                <div className='mt-3' style={{ marginTop: '30px' }}>
                    <table className='table' style={{ width: '100%', marginTop: '3%' }}>
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            { show ?(
                                currentItems.filter(app => app.Status === 'Accepted' && app.Date === curDate && app.Doctor_Name === staffname).map(app => {
                                    return (
                                        <tr key={app.Id}>
                                            <td>{`${app.Patient_Fname} ${app.Patient_Lname}`}</td>
                                            <td>{app.Date}</td>
                                            <td>{app.Doctor_Name}</td>
                                            <td>{app.Department}</td>
                                        </tr>
                                    )
                                })) : (
                                    currentItems.filter(app => app.Status === 'Accepted' && app.Date === curDate && app.Department === staffname && app.Attend !=='Yes').map(app => {
                                        return (
                                            <tr key={app.Id}>
                                                <td>{`${app.Patient_Fname} ${app.Patient_Lname}`}</td>
                                                <td>{app.Date}</td>
                                                <td>{app.Doctor_Name}</td>
                                                <td>{app.Department}</td>
                                                <td>
                                                    <button className='btn btn-info btn-sm me-2'  style={{cursor:'pointer',background:'blue',padding:'3px',color:'white'}}
                                                    onClick={() => handleVisit(app.Id)}>Visited</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='pagination' style={{ margin: '20px', display: 'flex', justifyContent: 'center' }}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                ))}
            </div>
        </div>
    )
}

export default DeptAppointment