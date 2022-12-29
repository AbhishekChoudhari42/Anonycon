import { useState , useContext,useEffect } from 'react'
import './style/app.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Sender from './pages/Sender';
import Receiver from './pages/Receiver';
import GoogleAuthPage from './pages/GoogleAuthPage'
import Nav from './components/Nav';
import jwt_decode from 'jwt-decode'
import axios  from 'axios';
import Error from './components/Error';
// =======================================================================


function App() {

  // username 
  const [user,setUser] = useState('')
  const [profile,setProfile] = useState('')
  
  //accesible only if coming through a redirected link 
  
// -------------------------------------------------
  const validateUser = async (userObj) =>{

  // contains email and generated username
   
    if(userObj){
      const Url = `${import.meta.env.VITE_APP_API_PATH}/user/validateuser`
      await axios.post(Url,userObj).then((response)=>{
        setUser(response.data.username)
      })
    }
  
}
const validateAndSetUser = async (cookie,decodedCookie) =>{
      
  if(cookie.includes('authToken')){
    
    const date = new Date().getMilliseconds();

    if(decodedCookie.given_name && decodedCookie.email){
      setProfile(decodedCookie)

      validateUser({email:decodedCookie.email,username:`${decodedCookie.given_name}_${date}`.toLowerCase()})
      
    return true;
  }
  }
}


  const router = createBrowserRouter([

    {
      path: "/sender/:uname",
      element:<Sender user={user}/>,
      errorElement:<Error/>
    },
    
    {
      path: "/receiver",
      element:<Receiver user = {user}/>,
      errorElement:<Error/>

    },
    {
      path: "/",
      element: <GoogleAuthPage validateAndSetUser={validateAndSetUser}  validateUser={validateUser} user={user} setUser={setUser} />,
      errorElement:<Error/>

    },
   
    
  ]);


let decodedCookie

// for validating user based on stored cookies
useEffect(()=>{

  if(localStorage.getItem('receiver')){
    setReceiver(localStorage.getItem('receiver'))
  }
  
  if(document.cookie.includes('authToken')){


        // 2nd ... validation So only email required 
        let cookie = document.cookie
            decodedCookie = jwt_decode(cookie)
            validateAndSetUser(cookie,decodedCookie);

  }   

  },[])


  // there is a function which does the job what is it ?

  // writing it now

  return (
    <div className="App">
      <Nav profile={profile} />
      <RouterProvider  router={router} />
    </div>
  )
}

export default App
