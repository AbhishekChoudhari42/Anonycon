import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'
import '../style/app.css'
import '../style/receiver.css'
import { Navigate } from 'react-router-dom'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)


const Receiver = (props) => {

  const [messages, setMessages] = useState(null)
  const [error , setError] = useState(false)
  let userString = `${props.user.given_name}`
  const URL = `http://localhost:5000/user/getmessage/`+userString.toLowerCase()
  const getMessage = async() =>{
    try{
    await axios.get(URL).then((response)=>{
        setMessages(response.data)

    });
  }catch(error){

    setError(true)

  }
  }

  const emoticons = ['🙁','😐','🙂']

  useEffect(() => {
    getMessage()    
    localStorage.removeItem('receiver')

  }, [])

  
  const timeAgo = new TimeAgo('en-US')

// time ago

  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  // ===========================
  
  return (
    <div className="container">
        <div className="main">
        {!props.login && <Navigate to = "/"/>}  
            
            <div className='link'>
                Copy URL
            </div>
            <div className='msg-area'>
                {messages && messages.map(msg => {
                    let msgData = JSON.parse(msg) 
                    return <div key = {messages.indexOf(msg) + Math.random()} className='msg'>
                      <p>{msgData.msg_txt || "no message"}</p>
                      <div className='msgInfo'>
                        <h5>{emoticons[(msgData.score > 0?2:msgData.score==0?1:0)]  || "0"}</h5>
                        <h6>{!isNaN(msgData.time)?timeSince(msgData.time)+" ago ":<div className='red'>time not found</div>}</h6>
                      </div>
                      
                    </div>
                })}
                {error && <div className='no-msg'>No messages found</div>}
            </div>
        </div>
    </div>
  )
}

export default Receiver