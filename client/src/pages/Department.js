import React from 'react'
import '../App.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import i1 from '../images/dept/pedia.jpg'
import i2 from "../images/dept/ortho.jpg"
import i3 from "../images/dept/cardio.jpg"
import i4 from "../images/dept/neuro.jpg"
import i5 from "../images/dept/onco.jpg"
import i6 from "../images/dept/radio.jpg"
import i7 from "../images/dept/therapy.jpg"
import i8 from "../images/dept/derma.jpg"
import i9 from "../images/dept/ent.jpg"

const Department = () => {
    const departmentsArray = [
        {
          name: "Pediatrics",
          imageUrl: i1,
        },
        {
          name: "Orthopedics",
          imageUrl: i2,
        },
        {
          name: "Cardiology",
          imageUrl: i3,
        },
        {
          name: "Neurology",
          imageUrl: i4,
        },
        {
          name: "Oncology",
          imageUrl: i5,
        },
        {
          name: "Radiology",
          imageUrl: i6,
        },
        {
          name: "Physical Therapy",
          imageUrl: i7,
        },
        {
          name: "Dermatology",
          imageUrl: i8,
        },
        {
          name: "ENT",
          imageUrl: i9,
        },
      ];

    const responsive = {
        extraLarge: {
          breakpoint: { max: 3000, min: 1324 },
          items: 4,
          slidesToSlide:1
        },
        large: {
            breakpoint: { max: 1324, min: 1005},
            items: 3,
            slidesToSlide:1
        },
        medium: {
            breakpoint: { max: 1005, min: 700  },
            items: 2,
            slidesToSlide:1
        },
        small: {
            breakpoint: { max: 700, min: 0 },
            items: 1,
            slidesToSlide:1
        },
      };
    return (
        <div className='container departments'>
            <h2>Department</h2>
            <Carousel responsive={responsive} removeArrowOnDeviceType={["medium","small"]}>
                {
                    departmentsArray.map((depart,index)=>{
                        return(
                            <div className='card' key={index}>
                                <div className='depart-name'>{depart.name}</div>
                                <img src={depart.imageUrl} alt={depart.name} />
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
  )
}

export default Department