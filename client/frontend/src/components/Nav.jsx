import React from 'react'
import '../style/navbar.css'
import jwt_decode from 'jwt-decode'
const Nav = (props) => {
const style = {
    width:'100%',
    height:'50px',
    background:'#111',
    color:'#fff',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'

}

const imgStyle = 
  {width:'30px',
  height:'30px',
  borderRadius:'.5em',
  border:'1px solid #222'

}


  return (
    <div style = {style} className="navbar" >
        
        <h2>Anonycon🤩</h2>
        {props.profile && <img style={imgStyle} src={props.profile.picture}/>}
    </div>
  )
}

export default Nav