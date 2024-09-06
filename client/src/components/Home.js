import React from 'react'
import '../App.css'
import Hero from '../pages/Hero'
import Biography from '../pages/Biography'
import Department from '../pages/Department'
import MessageForm from '../pages/MessageForm'
import i1 from '../images/hero.png'
import i2 from '../images/about.png'
import Navbar from '../pages/Navbar'
import Footer from '../pages/Footer'

const Homes = () => {
  return (
    <div>
        <Navbar />
        <Hero title={
            "Welcome to GM Group of Hospitals | Your trusted healthcare provider"
            } imgUrl={i1}/>
        <Biography imgUrl={i2}/>
        <Department />
        <MessageForm />
        <Footer />
    </div>
  )
}

export default Homes