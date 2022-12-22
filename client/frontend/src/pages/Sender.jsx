import React from 'react'
import '../style/sender.css'

import { useState } from 'react'
const Sender = () => {
    const [len,setLen] = useState(0);
    const updateLen = (e) =>{
        setLen(e.target.value.length)
        console.log(e.target.value.length + "...."+len)
    }
    return (
    <div className="container">
    <div className="main">
        
        <div className='link'>
            Send to : Userfd fsd fds
        </div>

        <div   className='txt-area'>
           <textarea style = {len > 240 ? {outline:'2px solid red'} : {outline:'2px solid #eee'}} className='txt' onChange={updateLen}></textarea>
           <h6>Characters : {len}</h6>
           {(len > 240) && <h6 style={{color : "red"}}>Max limit is 240 characters</h6>}
         <div className='send-msg'>Send</div>
           
        </div>
    </div>
</div>
  )
}

export default Sender