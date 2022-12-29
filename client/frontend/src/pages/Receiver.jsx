import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'
import '../style/app.css'
import '../style/receiver.css'
import jwt_decode from 'jwt-decode'
import { Navigate} from 'react-router-dom'



const Receiver = ({user}) => {

  const [messages, setMessages] = useState(null)
  const [error , setError] = useState(false)
  const [myURL,setMyURL] = useState('')
  const [valid,setValid] = useState(false)
  const getMessage = async() =>{
  if(user){    
    
    try{
      const URL = `${import.meta.env.VITE_APP_API_PATH}/user/getmessage/${user}`

    // await axios.get(URL).then((response)=>{
    //     if(response.data.length > 0){
    //     setMessages(response.data.reverse())
    //     }else{
    //       setError(true)
    //     }
    //   }
    
    // );
    await fetch(URL).then(response=>{
      console.log(response)
    })
    
  }catch(error){

      setError(true)

    }
  }
  }

  const emoticons = ['🙁','😐','🙂']

  useEffect(() => {
    
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
    
    
    getMessage()    

    
    

  }, [])
  useEffect(()=>
  {


    getMessage()
    return
  },[user])
  const refreshMessages = () =>{


    getMessage()
  }
// copy my location

const copyURL = () =>{

  if(user){

    let currentURL = window.location.href.toString().replace("receiver","sender/"+user)
    setMyURL(currentURL);
    navigator.clipboard.writeText(currentURL);
    
  }

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

            {valid && <Navigate to ="/"/>}

        <div className="main">
            
            <button className='link'>
                
               <h5 onClick={copyURL} className='myURL'>{myURL !== '' ? (myURL.slice(0,15) + "..."+myURL.slice(-15,myURL.length)):'Copy your URL'}</h5>
            
            </button>
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