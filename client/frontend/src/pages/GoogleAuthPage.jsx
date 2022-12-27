import React from 'react'
import { useEffect } from 'react'
import jwt_decode from 'jwt-decode' 
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const GoogleAuthPage = (props) => {

    const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false)

    function setCookie(cname, cvalue) {
        const d = new Date();
        d.setTime(d.getTime() + (12*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
    // validate or create user
    const validateUser = async (userObj) =>{
        await axios.post("http://localhost/5000/user/validateuser",userObj).then((response)=>{

        })
    }

    const handleCallbackResponse = (response) =>{
        
        if(jwt_decode(response.credential).email_verified){
            const decoded =  jwt_decode(response.credential)
            if(!document.cookie.authToken){
                setCookie('authToken',response.credential);
            }
            const date = new Date().getMilliseconds();

            validateUser({username:`${decoded.given_name}_${date}`,email:decoded.email})
            
            props.setUser(decoded)
            props.setLogin(true)
             
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

        const script = document.createElement("script")
        script.src = "https://accounts.google.com/gsi/client"
        script.onload = initializeGsi
        script.async = true
        script.id = "google-client-script"
        document.querySelector("body")?.appendChild(script)
    
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
        {!props.login && <div id="signin" ></div>}
        {props.login && <Navigate to = {props.receiver?"/sender":"/receiver"}/>}
    </div>
  )
}

export default GoogleAuthPage