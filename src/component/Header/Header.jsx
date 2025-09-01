import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <div className='header-ver-2025'>
        <div className='left-div'>
            <h1 className='main-text'>김근영 2025 portfolio</h1>  
        </div>
        <div className='right-div'>
            <NavLink 
              to="/2025port" 
              className={({ isActive }) => isActive ? 'menu-btn active' : 'menu-btn'}
            >
                <div className='menu-text'>MAIN</div>
            </NavLink>
            <NavLink 
              to="/portfolio" 
              className={({ isActive }) => isActive ? 'menu-btn active' : 'menu-btn'}
            >
                <div className='menu-text'>PORTFOLIO</div>
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? 'menu-btn active' : 'menu-btn'}
            >
                <div className='menu-text'>CONTACT</div>
            </NavLink>
        </div>
    </div>
  )
}

export default Header
