import { useState , useContext } from 'react'
import reactLogo from './assets/react.svg'
import './style/app.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Sender from './pages/Sender';
import Receiver from './pages/Receiver';
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
 
  
]);

function App() {
  return (
    <div className="App">
      <Nav/>
      <RouterProvider router={router} />
      
    </div>
  )
}

export default App
