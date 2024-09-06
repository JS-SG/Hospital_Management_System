import React, { useEffect, useState } from 'react';
import '../admin.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slidebar from './Slidebar';

const ViewDoctor = () => {
  const { id } = useParams();  
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const result = await axios.get('http://localhost:3001/doctor/' + id);
        if (result.data.Status) {
          setDoctor(result.data.Result[0]);
        } else {
          console.log(result.data.Error);
        }
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };
    getDoctor();
  }, [id]);

  return (
    <div style={{background:'#3939d9f2'}}>
      <Slidebar />
      <section className='page1 doctors' style={{ maxHeight: '585px' }}>
        <h1>DOCTORS</h1>
        {doctor.Image && (
          <img
            src={'http://localhost:3001/Images/' + doctor.Image}
            className='emp_img'
            style={{
              width: '100px',
              height: '90px',
              position: 'absolute',
              zIndex: '10',
              marginLeft: '37%',
              top: '32%'
            }}
            alt={doctor.Name}
          />
        )}
        <div className='banner'>
          <div className='card' style={{ marginTop: '45px', height: '100px', position: 'fixed', width: '80%' }}>
            <h4 style={{ marginTop: '80px' }}>{doctor.Name}</h4>
            <div className='details'>
              <p>Email: <span>{doctor.Email}</span></p>
              <p>Phone: <span>{doctor.Phone}</span></p>
              <p>DOB: <span>{doctor.DOB}</span></p>
              <p>Department: <span>{doctor.Department}</span></p>
              <p>Gender: <span>{doctor.Gender}</span></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewDoctor;
