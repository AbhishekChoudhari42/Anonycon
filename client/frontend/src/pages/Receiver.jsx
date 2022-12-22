import React from 'react'
import Message from '../components/Message'
import Nav from '../components/Nav'
import { useState , useEffect } from 'react'
import axios from 'axios'
import '../style/app.css'
import '../style/receiver.css'
const Receiver = () => {

  const [messages, setMessages] = useState([])
  const URL = 'http://localhost:5000/user/getmessage/u3'
  const getMessage = async() =>{
    await axios.get(URL).then((response)=>{
        setMessages(response.data)
    });
  }

  const emoticons = ['🤬','🙂','😀','😃','😊','😙','💀']

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
                    return <div className='msg'><p>{msg}</p></div>
                })}
            </div>
        </div>
    </div>
  )
}

export default Receiver