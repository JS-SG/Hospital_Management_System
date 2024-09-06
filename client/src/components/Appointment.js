import React from 'react'
import AppointmentForm from '../pages/AppointmentForm'
import i1 from '../images/signin.png'
import i3 from '../images/Vector.png'
import Navbar from '../pages/Navbar'
import Footer from '../pages/Footer'
import '../App.css'


const Appointment = () => {
  return (
    <div>
      <Navbar />
      <div className='hero container'>
            <div className='banner1' >
                <h3>Schedule your Appointment | GM Group of Hospitals</h3>
                <p >
                    GM Group of Hospitals is a state-of-the-art facility dedicated
                    to providing comprehensive healthcare services with compassion and
                    expertise. Our team of skilled professionals is committed to
                    delivering personalized care tailored to each patient's needs. At
                    ZeeCare, we prioritize your well-being, ensuring a harmonious
                    journey towards optimal health and wellness.
                </p>
            </div>
            <div className="banner1">
                <img src={i1} alt="hero" className="animated-image"/>
                <span>
                    <img src={i3} alt="vector" />
                </span>
            </div>
        </div>
      <AppointmentForm />
      <Footer />
    </div>
  )
}

export default Appointment