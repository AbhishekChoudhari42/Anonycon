import React from 'react'
import '../style/sender.css'
import axios from 'axios'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
const Sender = (props) => {
    
    const [message,setMessage] = useState("")
    
    const [response , setResponse] = useState(false)
    const sendMessage = async () =>{
        
    const URL = `${import.meta.env.VITE_APP_API_PATH}/user/sendmessage/`+props.user
        
        if(len<=240){

        await axios.put(URL,{
            
            username:localStorage.getItem('receiver'),
            message:message

        }).then((response)=>{
            setResponse(true)
            setMessage('')
            
        })
    }else{
        alert("length of the message should not be greater than 240 characters")
    }
    }



    const [len,setLen] = useState(0);

    const updateLen = (e) =>{
        setLen(e.target.value.length)
        setMessage(e.target.value)
        setResponse(false)
        console.log(e.target.value.length + "...."+len)
    }
    return (
    <div className="container">
    <div className="main">
    {!localStorage.getItem('receiver') && <Navigate to = "/receiver"/>}       

        <div className='link'>
            Send to : {props.receiver || 'no user found'}
        </div>

        <div   className='txt-area'>
           <textarea value={message} style = {len > 240 ? {outline:'2px solid red'} : {outline:'2px solid #eee'}} className='txt' onChange={updateLen}></textarea>
           <h6>Characters : {len}</h6>

           {(len > 240) && <h6 style={{color : "red"}}>Max limit is 240 characters</h6>}
            {response && <h6 style = {{color:"green" }}>message sent successfully</h6>}
         <div onClick={sendMessage} className='send-msg'>Send</div>
           
        </div>
    </div>
</div>
  )
}

export default Sender