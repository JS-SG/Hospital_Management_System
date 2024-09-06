import React, {  useEffect, useState } from 'react'
import '../admin.css'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import Slidebar from './Slidebar'
import Cookies from 'js-cookie'

const Messages = () => {
  const [messages,setMessages]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const adname= Cookies.get('id')
  const [present,setPresent]=useState(false);
  useEffect(()=>{
    if(adname!==null || adname!==undefined){
        setPresent(true)
    }
  },[adname])
  useEffect(()=>{
    const getMsg=async ()=>{
      await axios.get('http://localhost:3001/messages')
      .then(result=>{
        setMessages(result.data.Result)
      }).catch(err=>console.log('Error fetching messages',err))
    };
    getMsg();
  })
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = messages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(messages.length / itemsPerPage);
  return (
    <div style={{background:'#3939d9f2'}}>
      <Slidebar />
    <section className='page1 messages1' style={{maxHeight:'500px'}}>

      <h1>MESSAGES</h1>
      <div className='banner'>
        {
          messages && messages.length > 0 ?(currentItems.map(element=>{
            return(
              <div className='card'>
                <div className='details'>
                    <p>First Name: <span>{element.Fname}</span></p>
                    <p>Last Name: <span>{element.Lname}</span></p>
                    <p>Email: <span>{element.Email}</span></p>
                    <p>Phone: <span>{element.Phone}</span></p>
                    <p>Message: <span>{element.Message}</span></p>
                </div>
              </div>
            )
          })) : (<h1>No Messages!</h1>)
        }
      </div>
    </section>
    <div className='pagination' style={{margin: '20px',display: 'flex', justifyContent: 'center'}}>
        {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
        ))}
    </div>
    </div>
  )
}

export default Messages