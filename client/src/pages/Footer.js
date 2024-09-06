import React from 'react'
import '../App.css'
import i1 from '../images/logo.png'
import { Link } from 'react-router-dom'
import {FaPhone,FaLocationArrow} from 'react-icons/fa'
import {MdEmail} from 'react-icons/md'

const Footer = () => {
    const hours = [
        {
          id: 1,
          day: "Monday",
          time: "9:00 AM - 11:00 PM",
        },
        {
          id: 2,
          day: "Tuesday",
          time: "12:00 PM - 12:00 AM",
        },
        {
          id: 3,
          day: "Wednesday",
          time: "10:00 AM - 10:00 PM",
        },
        {
          id: 4,
          day: "Thursday",
          time: "9:00 AM - 9:00 PM",
        },
        {
          id: 5,
          day: "Monday",
          time: "3:00 PM - 9:00 PM",
        },
        {
          id: 6,
          day: "Saturday",
          time: "9:00 AM - 3:00 PM",
        },
      ];
    return (
    <div>
        <footer className='container'>
            <hr />
            <div className='content'>
                <div>
                    <img src={i1} alt='logo' className='logo-img'/>
                </div>
                <div>
                    <h4>Quick links</h4>
                    <ul>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/appointment'}>Appointment</Link>
                        <Link to={'/about'}>About Us</Link>
                    </ul>
                </div>
                <div>
                    <h4>Hours</h4>
                    {
                        hours.map(h=>{
                            return(
                                <li key={h.id}>
                                    <span>{h.day}</span>
                                    <span>{h.time}</span>
                                </li>
                            )
                        })
                    }
                </div>
                <div>
                    <h4>Contact</h4>
                    <div>
                        <FaPhone />
                        <span>999-999-999</span>
                    </div>
                    <div>
                        <MdEmail />
                        <span>gmhospitals@gmail.com</span>
                    </div><div>
                        <FaLocationArrow />
                        <span>Tamil Nadu, India</span>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer