import React from 'react'
import './Sidebar.css'
import { Link, NavLink } from 'react-router-dom' 
import {assets} from '../../assets/assets'  
//import add_icon from '../../assets/add_icon.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
       <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
            <img src={assets.add_icon} alt="add"/> 
            <p>Add Items</p>
        </NavLink>
        <NavLink to="/list"  className="sidebar-option">
            <img src={assets.order_icon} alt="List"/> 
            <p>List Items</p>
        </NavLink>
        <NavLink to="/orders"  className="sidebar-option">
            <img src={assets.order_icon} alt="Orders" /> 
            <p>Orders</p>
        </NavLink>
       </div>
    </div>
  )
}

export default Sidebar