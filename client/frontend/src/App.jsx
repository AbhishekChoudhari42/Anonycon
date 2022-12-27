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


function App() {

  const [login,setLogin] = useState(false)
  const [user,setUser] = useState(false)
  const [receiver,setReceiver] = useState('')

  const validateUser = async (userObj) =>{
    await axios.post(`${import.meta.env.VITE_APP_API_PATH}/user/validateuser`,userObj).then((response)=>{
        return response
    })
    console.log('sd sds d s')
}


  const router = createBrowserRouter([

    {
      path: "/sender",
      element:<Sender receiver={receiver} setReceiver={setReceiver} login={login} setLogin={setLogin}/>
    },
    
    {
      path: "/receiver",
      element:<Receiver validateUser={validateUser} user = {user} receiver={receiver} login={login} setLogin={setLogin}/>
    },
    {
      path: "/",
      element:<GoogleAuthPage validateUser={validateUser} user={user} setUser={setUser} receiver={receiver} login={login} setLogin={setLogin} />
    },
   
    
  ]);


  useEffect(()=>{
    let cookie = document.cookie

    if(localStorage.getItem('receiver')){
      setReceiver(localStorage.getItem('receiver'))
    }

      if(decodeURI(document.cookie).includes('authToken')){
      let cookieDecoded = jwt_decode(cookie)
      if(validateUser({email:cookieDecoded.email})){
        setLogin(true)
      }
      setUser(cookieDecoded) 

      
    }

  },[])

  return (
    <div className="App">
      <Nav user={user} setLogin={setLogin} />
      <RouterProvider  router={router} />
    </div>
  )
}

export default App
