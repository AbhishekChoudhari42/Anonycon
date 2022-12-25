import React from 'react'
import { useEffect } from 'react'
import jwt_decode from 'jwt-decode' 
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
const GoogleAuthPage = ({props}) => {

    const [auth,setAuth] = useState(false)

    function setCookie(cname, cvalue) {
        const d = new Date();
        d.setTime(d.getTime() + (12*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }

    const handleCallbackResponse = (response) =>{
        
        if(jwt_decode(response.credential).email_verified){
            setCookie(authToken,response.credential);
            console.log(jwt_decode(response.credential).email_verified)
            setAuth(true)
            
        }
        
    }
    
    useEffect(()=>{

        google.accounts.id.initialize({
            client_id:import.meta.env.VITE_APP_CLIENT_ID,
            callback : handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById("signin"),{theme:'outline',size:'large'}
        )

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
        {auth && <Navigate to = "/sender"/>}
    </div>
  )
}

export default GoogleAuthPage