import React, { useEffect, useState } from 'react'
import { TiHome } from 'react-icons/ti';
import Cookies from 'js-cookie'
import { RiLogoutCircleFill } from 'react-icons/ri';
import { AiFillMessage } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserDoctor } from 'react-icons/fa6';
import { MdAddModerator } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [show, setShow] = useState(false);
    const staffname = Cookies.get('dname')
    const adname=Cookies.get('name')
    const [present, setPresent] = useState(false);
    useEffect(() => {
        if (staffname !== null || staffname !== undefined) {
            setPresent(true)
        }
    }, [staffname])
    const nav = useNavigate();

    const handleLogout = () => {
        Cookies.remove('dname')
        setShow(!show)
        if(adname === null || adname === undefined){
            nav('/deptlogin')
        }
        else{
            nav('/admin_dashboard/department')
        }
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
                        <li className='w-100'><Link to={'/dept_dashboard'} className='nav-link text-white px-0 align-middle'>
                        <i className='ms-2' style={{color:'white',fontSize:'40px'}}><TiHome /></i>
                        </Link></li><br />
                        <li className='w-100'><Link to={'/dept_dashboard/patients'} className='nav-link px-0 align-middle text-white'>
                        <i className='bi-person ms-2' style={{color:'white',fontSize:'50px'}}></i>
                        </Link></li><br/>
                        <li className='w-100'><Link to={'/dept_dashboard/doctor_profile'} className='nav-link px-0 align-middle text-white'>
                        <i className='ms-2' style={{color:'white',fontSize:'40px'}}><FaUserDoctor /></i>
                        </Link></li><br/>
                        <li className='w-100'><Link to={'/dept_dashboard/messages' } className='nav-link px-0 align-middle text-white'>
                        <i className='ms-2' style={{color:'white',fontSize:'40px'}}><AiFillMessage /></i>
                        </Link></li><br />
                        <li className='w-100' onClick={handleLogout}><Link className='nav-link px-0 align-middle text-white'>
                        <i className='bi-power ms-2' style={{color:'white',fontSize:'40px'}}></i>
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
}

export default Sidebar