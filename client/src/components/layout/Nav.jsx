import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li><NavLink to="dashboard">Inicio</NavLink></li>
        <li><NavLink to="articles">Artículos</NavLink></li>
        <li><NavLink to="add">Añadir</NavLink></li>
        <li><a onClick={() => {
          window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
        }}>Contacto</a></li>
      </ul>
    </nav>
  )
}

export default Nav
