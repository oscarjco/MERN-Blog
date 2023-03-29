import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='card'>
      <h1>Bienvenido al blog MERN</h1>
      <p>Blog desarrollado con MERN stack (MongoDB, Express, React y NodeJS)</p>
      <Link to="/articles" className='button'>Ver artículos</Link>
    </div>
  )
}

export default Dashboard
