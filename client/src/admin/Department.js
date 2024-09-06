import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import Slidebar from './Slidebar'

const Department = () => {
    const nav=useNavigate();
    const [department, setDepartment] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/department')
            .then(result => {
                if (result.data.Status) {
                    setDepartment(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])
    const handleDept=(name)=>{
        Cookies.set('dname',name)
        nav('/dept_dashboard')
    }
    return (
        <div style={{ background: '#3939d9f2',height:'600px' }}>
            <Slidebar />
            <section className='page1 messages1' style={{maxHeight:'500px',width:'85%'}}>
            <div className='px-5 mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3 style={{marginLeft:'35%'}}>DEPARTMENTS</h3>
                </div>
                <Link to="/admin_dashboard/add_department" className='btn btn-success'>
                    <button style={{cursor:'pointer',background:'blue',padding:'1%',color:'white'}}>Add Department</button>
                </Link>
                <div style={{marginTop:'3%'}}>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th><br /><br />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                department.map(c => (
                                    <tr key={c.Name}>
                                        <td style={{cursor:'pointer'}}><button onClick={()=>handleDept(c.Name)}>{c.Name}</button></td><br /><br />
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </section>
        </div>
    )
}

export default Department