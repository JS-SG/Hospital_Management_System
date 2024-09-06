import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Slidebar from './Slidebar'

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dept: '',
        password: ''
    })
    const nav = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/add_department', department)
            .then(result => {
                if (result.data.Status) {
                    nav('/admin_dashboard/department')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div style={{ background: '#3939d9f2', height: '600px' }}>
            <Slidebar />
            <section className='page1 messages1' style={{ maxHeight: '500px', width: '85%' }}>
                <div className='d-flex justify-content-center align-items-center h-75'>
                    <div className='p-3 rounded w-25 border'>
                        <h2 style={{marginLeft:'30%'}}>Add Department</h2>
                        <form onSubmit={handleSubmit} style={{marginTop:'7%',marginLeft:'35%'}}>
                            <div className='mb-3' >
                                <label htmlFor="department" style={{fontSize:'24px'}}><strong>Department:</strong></label><br /><br />
                                <input type="text" name='department' autoComplete='off' placeholder='Enter Department' style={{padding:'10px'}}
                                    onChange={(e) => setDepartment({ ...department, dept: e.target.value })} className='form-ctrl rounded-0'></input>
                            </div><br />
                            <div className='mb-3'>
                                <label htmlFor="password" style={{fontSize:'24px'}}><strong>Password:</strong></label><br /><br />
                                <input type="password" name='password' autoComplete='off' placeholder='Enter Password' style={{padding:'10px'}}
                                    onChange={(e) => setDepartment({ ...department, password: e.target.value })} className='form-ctrl rounded-0'></input>
                            </div><br />
                            <button className='btn btn-success w-100 rounded-0 mb-2' 
                                style={{cursor:'pointer',background:'blue',padding:'2%',color:'white',marginLeft:'48px'}}>Add </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}



export default AddDepartment