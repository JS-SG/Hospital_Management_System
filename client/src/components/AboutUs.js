import React from 'react'
import Navbar from '../pages/Navbar'
import Biography from '../pages/Biography'
import i1 from '../images/about.png'
import i2 from '../images/whoweare.png'
import i3 from '../images/Vector.png'
import '../App.css'
import Footer from '../pages/Footer'

const AboutUs = () => {
  return (
    <div>
        <Navbar />
        <div className='hero container'>
            <div className='banner1' >
                <h3>Learn more about us | GM Group of Hospitals</h3>
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
        <Biography imgUrl={i2} />
        <Footer />
      </div>
  )
}

export default AboutUs