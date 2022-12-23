import React from 'react'
import '../style/sender.css'
import axios from 'axios'
import { useState } from 'react'
const Sender = () => {
    
    const [user,setUser] = useState("u2")
    const [message,setMessage] = useState("")
    
    const [response , setResponse] = useState(false)
    const URL = "http://localhost:5000/user/sendmessage/"+user
    const sendMessage = async () =>{
        if(len<=240){

        
        await axios.put(URL,{
            username:"u6",
            message:message
        }).then((response)=>{
            console.log(response.data)
            setResponse(true)
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
        
        <div className='link'>
            Send to : Userfd fsd fds
        </div>

        <div   className='txt-area'>
           <textarea style = {len > 240 ? {outline:'2px solid red'} : {outline:'2px solid #eee'}} className='txt' onChange={updateLen}></textarea>
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