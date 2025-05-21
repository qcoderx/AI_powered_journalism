import { MenuIcon, X } from 'lucide-react';
import React, { useState } from 'react'
import './Menu.css'

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className='menu-container'>
        <button className='menu-button' onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <MenuIcon />}
        </button>
    </div>
  )
}

export default Menu