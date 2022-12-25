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
const router = createBrowserRouter([
  {
    path: "/sender/:uid",
    element:<Sender/>
  },
  {
    path: "/receiver/:uid",
    element:<Receiver/>
  },
  {
    path: "/",
    element:<GoogleAuthPage/>
  },
 
  
]);

function App() {

  const [login,setLogin] = useState(false)

  return (
    <div className="App">
      <Nav/>
      <RouterProvider login={login} setLogin={setLogin} router={router} />
      
    </div>
  )
}

export default App
