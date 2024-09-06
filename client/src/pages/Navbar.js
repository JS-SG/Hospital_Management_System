import React, {  useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import i1 from '../images/logo.png'
import {GiHamburgerMenu} from "react-icons/gi"

const Navbar = () => {
    const uid=Cookies.get('id')
    const nav = useNavigate()
    const [show,setShow]=useState(false);
    const [present,setPresent]=useState(false);
    useEffect(() => {
        if (uid !== null && uid !== undefined) {
            setPresent(true);
        }
    }, [uid]);
    const handleLogout=async (e)=>{
        e.preventDefault()
        try{
            await axios.put('http://localhost:3001/status-out/'+uid,{stat:'Out'})
            .then(result=>{
                if(result.data.Status){
                    Cookies.remove('id');
                    setPresent(false);
                    nav('/')
                }
                else{
                    console.log(result.data.Error)
                }
            }).catch(err=>console.log("Error",err))
        }catch(err){
            console.log(err)
        }
    }
    const handleLogin=()=>{
        nav('/login')
    }

    return (
    <nav className='nav'>
        <div className='logo'><img src={i1} alt='logo' className='logo-img'/></div>
        <div className={show ? "navLinks showmenu":"navLinks"}>
            <div className='links' style={{display: 'flex',gap: '30px',width: '600px',position: 'absolute'}}>
                <Link to={"/"}>HOME</Link>
                <Link to={`/${uid}/appointment`}>APPOINTMENT</Link>
                <Link to={`/${uid}/about`}>ABOUT US</Link>
            </div>
            {present ? (<button className='logoutBtn btn' onClick={handleLogout}>LOGOUT</button>):
            (<button className='loginBtn btn' onClick={handleLogin}>LOGIN</button>)}
        </div>
        <div className='hamburger' onClick={()=>setShow(!show)}>
            <GiHamburgerMenu />
        </div>
    </nav>
  )
}

export default Navbar