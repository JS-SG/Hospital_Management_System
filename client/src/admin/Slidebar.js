import React, { useContext, useEffect, useState } from 'react';
import '../admin.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import Cookies from 'js-cookie'
import i1 from '../images/logo.png'
import { TiHome } from 'react-icons/ti';
import { RiLogoutCircleFill } from 'react-icons/ri';
import { AiFillMessage } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserDoctor } from 'react-icons/fa6';
import { MdAddModerator } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaBook } from 'react-icons/fa';

const Slidebar = () => {
    const [show, setShow] = useState(false);
    const adname = Cookies.get('name')
    const [present, setPresent] = useState(true);
    useEffect(() => {
        if (adname === null || adname === undefined) {
            setPresent(false)
        }
    }, [adname])
    const nav = useNavigate();

    const handleLogout = () => {
        Cookies.remove('name')
        setShow(!show)
        nav('/adminlogin')
        /*try {
            const result = await axios.put('http://localhost:3001/logout');
            if (result.data.Status) {
                nav('/');
                setIsValidated(false);
            } else {
                toast.error(result.data.Error);
            }
        } catch (err) {
            console.log("Error", err);
        }*/
    };

    return (
        <div className='container-fluid'>
        <div className='row flex-nowrap'>,
            <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark' style={{marginTop:'2%',position:'absolute'}}>
                <div className='d-flex flex-column align-items-center align-items-sm-start px-10 pt-2 text-white min-vh-100' >
                    <ul 
                    className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' style={{gap:'30px',marginLeft:'40px'}}>
                        <li className='w-100'><Link to={'/admin_dashboard'} className='nav-link text-white px-0 align-middle'>
                        <i className='ms-2' style={{color:'white',fontSize:'30px'}}><TiHome /></i>
                        </Link></li><br />
                        <li className='w-100'><Link to={'/admin_dashboard/appointments'} className='nav-link px-0 align-middle text-white'>
                        <i className='bi-person ms-2' style={{color:'white',fontSize:'30px'}}></i>
                        </Link></li><br/>
                        <li className='w-100'><Link to={'/admin_dashboard/department' } className='nav-link px-0 align-middle text-white'>
                        <i className='ms-2' style={{color:'white',fontSize:'30px'}}><FaBook /></i>
                        </Link></li><br />
                        <li className='w-100'><Link to={'/admin_dashboard/doctors'} className='nav-link px-0 align-middle text-white'>
                        <i className='ms-2' style={{color:'white',fontSize:'30px'}}><FaUserDoctor /></i>
                        </Link></li><br/>
                        <li className='w-100'><Link to={'/admin_dashboard/doctor/addnew'} className='nav-link px-0 align-middle text-white'>
                        <i className='ms-2' style={{color:'white',fontSize:'30px'}}><IoPersonAddSharp /></i>
                        </Link></li><br />
                        <li className='w-100'><Link to={'/admin_dashboard/admin/addnew' } className='nav-link px-0 align-middle text-white'>
                        <i className='ms-2' style={{color:'white',fontSize:'30px'}}><MdAddModerator /></i>
                        </Link></li><br />
                        <li className='w-100'><Link to={'/admin_dashboard/messages' } className='nav-link px-0 align-middle text-white'>
                        <i className='ms-2' style={{color:'white',fontSize:'30px'}}><AiFillMessage /></i>
                        </Link></li><br />
                        <li className='w-100' onClick={handleLogout}><Link className='nav-link px-0 align-middle text-white'>
                        <i className='bi-power ms-2' style={{color:'white',fontSize:'30px'}}></i>
                        </Link></li>
                    </ul>
                </div>
            </div>
                <div style={!present ? { display: 'none' } : { display: 'flex' }} className='wrapper1'>
                    <GiHamburgerMenu className='hamburger' onClick={() => setShow(!show)} />
                </div>
            </div>
        </div>
    );
};
export default Slidebar;
