import React from 'react'
import '../style/sender.css'
import axios from 'axios'
import { useState , useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import { Navigate , useParams} from 'react-router-dom'
const Sender = (props) => {
    
    const [message,setMessage] = useState("")
    const {uname} = useParams();
    const [valid , setValid] = useState(false)

    useEffect(() =>{
        if(document.cookie.includes('authToken')){
            const decoded = jwt_decode(document.cookie);
            if(decoded.email_verified){
                setValid(false)
            }else{
                setValid(true)
            }
        }else{
            setValid(true)
        }
    },[])    
    const [response , setResponse] = useState(false)
    const sendMessage = async () =>{
        
    const URL = `${import.meta.env.VITE_APP_API_PATH}/user/sendmessage/`+uname
        
        if(len<=240){
        try{
        await axios.put(URL,{
            
            username:props.user,
            message:message

        }).then((response)=>{
            if(response.data){
                console.log(response.data)
            }
            setResponse(true)
            setMessage('')
            
        }).catch((error)=>{
            if(error.code == "ERR_BAD_RESPONSE"){
                alert("please follow the correct URL user does not exist");
            }
        })
    }catch(error){
        console.log(error)

    }
    }else if(uname == props.user){
        alert("you cannot message yourself")
    }
    else{
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
    {valid && <Navigate to="/"/>}

    {!uname && <Navigate to = "/receiver"/>}       

        <div className='link'>
            Send to : {uname || 'no user found'}
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