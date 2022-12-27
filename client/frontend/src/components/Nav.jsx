import React from 'react'
import '../style/navbar.css'

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
        
        <h1>Anonycon🤩</h1>
        <img style={imgStyle} src={props.user.picture}/>
        {console.log(props.user)}
    </div>
  )
}

export default Nav