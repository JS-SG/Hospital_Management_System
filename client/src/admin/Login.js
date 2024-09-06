import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import i1 from '../images/logo.png';
import '../admin.css'
import axios from 'axios';
import Slidebar from './Slidebar';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:3001/adminlogin', data)
        .then(result=>{
          if (result.data.Status) {
            const name=result.data.Result[0].Name;
            Cookies.set('name',name,{expires:1})
            nav('/admin_dashboard');
          } else {
            alert(result.data.Error);
          }
        })
      } catch (err) {
        console.log(err);
        alert('An error occurred. Please try again.');
      }
  };

  return (
    <div>
    <Link to="/deptlogin" className='btn btn-info'><button className='btn' style={{background:'linear-gradient(140deg, #9083d5, #271776ca)',color:'white'}}>Back</button></Link>
    <div className="container1 form-compoent1 login-form" style={{position:'absolute',top:'3px',left:'250px',marginTop:'5px'}}>
      <img src={i1} alt="logo" className="logo1" style={{height:'180px'}}/><br />
      <h1 className="form-title">WELCOME TO GM GROUPS</h1>
      <p>Only Admins are allowed to access these resources!</p><br />
      <form onSubmit={handleLogin} id="admin-form" >
        <label htmlFor="email" style={{fontSize:'24px'}}>Email:</label><br />
        <input style={{flex: '1',fontSize:'20px',padding: '3px',borderRadius: '4px',
          border: '1px solid gray'}}
          type="email"
          name="email"
          id="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="form-input"
          placeholder="Email"
          autoComplete="off"
        /><br /><br />
        <label htmlFor="password"style={{fontSize:'24px'}}>Password:</label><br />
        <input style={{flex: '1',fontSize:'20px',padding: '3px',borderRadius: '4px',
          border: '1px solid gray'}}
          type="password"
          id="confirm"
          name="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="form-input"
          placeholder="Password"
          autoComplete="off"
        /><br /><br />
        <div style={{justifyContent:'center',alignItems:'center'}}>
          <button type='submit' style={{fontSize:'20px',background:'linear-gradient(140deg, #9083d5, #271776ca)',color:'white',
             padding: '5px',width:'fit-content'
          }} >Login</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
