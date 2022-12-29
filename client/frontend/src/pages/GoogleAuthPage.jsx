import React from 'react'
import { useEffect } from 'react'
import jwt_decode from 'jwt-decode' 
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const GoogleAuthPage = (props) => {

    const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false)
    const [gsiState,setGsiState] = useState();


    function setCookie(cname, cvalue) {
        const d = new Date();
        d.setTime(d.getTime() + (12*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
    // validate or create user
    

    const handleCallbackResponse = (response) =>{
        
        if(jwt_decode(response.credential).email_verified){

            const decoded =  jwt_decode(response.credential)
            if(!document.cookie.includes('authToken')){
                setCookie('authToken',response.credential);
                let cookie = document.cookie
                if(document.cookie.includes('authToken')){
                let decodedCookie = jwt_decode(cookie)
                props.validateAndSetUser(cookie,decodedCookie)
              }
            }             
        }
        
    }
    
    useEffect(()=>{

      const initializeGsi = () => {
            if (!window.google || gsiScriptLoaded) return
      
            setGsiScriptLoaded(true)
            window.google.accounts.id.initialize({
              client_id: import.meta.env.VITE_APP_CLIENT_ID,
              callback: handleCallbackResponse,
            })
            let btn = document.getElementById("signin")
            if(btn){window.google.accounts.id.renderButton(
                btn,{theme:'outline',size:'large'}
            )}
          }
        if(!document.cookie.includes('authToken')){

        
            const script = document.createElement("script")
            script.src = "https://accounts.google.com/gsi/client"
            script.onload = initializeGsi
            script.async = true
            script.id = "google-client-script"
            document.querySelector("body")?.appendChild(script)
            
      }else{
        setGsiState(true)
      }
    
    },[])

    const containerStyle = {
        width : '100vw',
        height:'calc(100vh - 50px)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }

    return (
    <div style={containerStyle}>
        <div id="signin" ></div>
        {document.cookie.includes('authToken') && <Navigate to = {props.receiver?"/sender":"/receiver"}/>}
    </div>
  )
}

export default GoogleAuthPage