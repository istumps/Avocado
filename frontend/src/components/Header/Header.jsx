import React, { useState } from 'react'
import './Header.css'



const Header = () => {
  const [menu, setMenu] = useState("home");




  return (
    <div className='header'>
        <div className="header-content">
            <h2>Order your favorite food here!</h2>
            <a href="#explore-menu" onClick={()=>setMenu("menu")} >View Menu</a>
        </div>
    </div>
  )
}

export default Header