import React from 'react'
import i1 from '../images/Vector.png'
import '../App.css'
const Hero = ({title,imgUrl}) => {
  return (
    <div>
        <div className='hero container'>
            <div className='banner' >
                <h3>{title}</h3>
                <p >
                    GM Group of Hospitals is a state-of-the-art facility dedicated
                    to providing comprehensive healthcare services with compassion and
                    expertise. Our team of skilled professionals is committed to
                    delivering personalized care tailored to each patient's needs. At
                    ZeeCare, we prioritize your well-being, ensuring a harmonious
                    journey towards optimal health and wellness.
                </p>
            </div>
            <div className="banner">
                <img src={imgUrl} alt="hero" className="animated-image"  />
                <span>
                    <img src={i1} alt="vector" />
                </span>
            </div>
        </div>
    </div>
  )
}
export default Hero