import { useState , useContext,useEffect } from 'react'
import reactLogo from './assets/react.svg'
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



function App() {

  const [login,setLogin] = useState(false)
  const [user,setUser] = useState(false)
  const [receiver,setReceiver] = useState('')

  const validateToken = (ck)=>{
    return ck
  }

  const router = createBrowserRouter([
    {
      path: "/sender",
      element:<Sender receiver={receiver} setReceiver={setReceiver} login={login} setLogin={setLogin}/>
    },
    
    {
      path: "/receiver",
      element:<Receiver user = {user} receiver={receiver} login={login} setLogin={setLogin}/>
    },
    {
      path: "/",
      element:<GoogleAuthPage user={user} setUser={setUser} receiver={receiver} login={login} setLogin={setLogin} />
    },
   
    
  ]);


  useEffect(()=>{
    let cookie = document.cookie || false
    if(localStorage.getItem('receiver')){
      setReceiver(localStorage.getItem('receiver'))
    }

    if(validateToken(cookie)){
      if(cookie){
      setUser(jwt_decode(cookie)) 
      setLogin(true)
    }
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
