import axios from 'axios';
import React, { useState } from 'react'
import '../App.css'

const MessageForm = () => {
    const [data,setData]=useState({
        fname:'',
        lname:'',
        email:'',
        phone:'',
        msg:'',
    });
    const handleSubmit=(e)=>{
        e.preventDefault()
        try{
            console.log(data)
            axios.post('http://localhost:3001/msg',data)
            .then(result=>{
                if(result.data.Status){
                alert('Message sent successfully')
                }
                else{
                    alert('Error in sending message')
                }
            })
            .catch(err=>console.log(err))
        }
        catch(err){
            console.log(err)
        }
    }
    return (
    <div className='container form-component message-form'>
        <h2>Send us a message</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" placeholder='First Name' value={data.fname}
                onChange={(e)=>setData({...data,fname:e.target.value})}></input>
                <input type="text" placeholder='Last Name' value={data.lname}
                onChange={(e)=>setData({...data,lname:e.target.value})}></input>
            </div>
            <div>
            <input type="email" placeholder='Email' value={data.email}
                onChange={(e)=>setData({...data,email:e.target.value})}></input>
                <input type="number" placeholder='Phone' value={data.phone}
                onChange={(e)=>setData({...data,phone:e.target.value})}></input>
            </div>
            <textarea rows={7} placeholder='Message' value={data.msg}
            onChange={(e)=>setData({...data,msg:e.target.value})}></textarea>
            <div style={{justifyContent:'center',alignItems:'center'}}>
                <button type='submit'>Send</button>
            </div>
        </form>
    </div>
  )
}

export default MessageForm