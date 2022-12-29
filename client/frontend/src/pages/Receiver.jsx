import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'
import '../style/app.css'
import '../style/receiver.css'
import { Navigate } from 'react-router-dom'



const Receiver = ({user}) => {

  const [messages, setMessages] = useState(null)
  const [error , setError] = useState(false)

  const getMessage = async() =>{
  if(user){    
    
    try{
      const URL = `${import.meta.env.VITE_APP_API_PATH}/user/getmessage/${user}`

    await axios.get(URL).then((response)=>{
        if(response.data.length > 0){
        setMessages(response.data.reverse())
        }else{
          setError(true)
        }
      }
    
    );
  }catch(error){

      setError(true)

    }
  }
  }

  const emoticons = ['🙁','😐','🙂']

  useEffect(() => {
    getMessage()    
    
    

  }, [])
  useEffect(()=>{
    getMessage()
    return
  },[user])
  const refreshMessages = () =>{
    getMessage()
  }

  

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
            
            <div className='link'>
                Copy URL
            </div>
            {!document.cookie.includes('authToken')&&<Navigate to ="/"/>}
            {user && <div className='msg-area'>
              <button className="refresh" onClick={refreshMessages}>Refresh</button>
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
            </div>}
        </div>
    </div>
  )
}

export default Receiver