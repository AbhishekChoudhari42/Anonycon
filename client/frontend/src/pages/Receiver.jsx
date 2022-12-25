import React from 'react'
import Message from '../components/Message'
import Nav from '../components/Nav'
import { useState , useEffect } from 'react'
import axios from 'axios'
import '../style/app.css'
import '../style/receiver.css'
const Receiver = () => {

  const [messages, setMessages] = useState([])
  const URL = 'http://localhost:5000/user/getmessage/u2'
  const getMessage = async() =>{
    await axios.get(URL).then((response)=>{
        setMessages(response.data)
    });
  }

  const emoticons = ['🙁','😐','🙂']

  useEffect(() => {

    getMessage()    

  }, [])
  
  
  return (
    <div className="container">
        <div className="main">
            
            <div className='link'>
                Copy URL
            </div>
            
            <div className='msg-area'>
                {messages && messages.map(msg => {
                    let msgData = JSON.parse(msg) 
                    return <div key = {messages.indexOf(msg) + Math.random()} className='msg'>
                      <p>{msgData.msg_txt || "no message"}</p>
                      <p>{emoticons[(msgData.score > 0?2:msgData.score==0?1:0)]  || "0"}</p>
                      
                    </div>
                })}
            </div>
        </div>
    </div>
  )
}

export default Receiver