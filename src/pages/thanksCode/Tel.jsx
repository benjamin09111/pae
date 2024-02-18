import React from 'react'
import {Link} from "react-router-dom"
import logo from "../../assets/logo-1.png";
import "../pages.css"

const Tel = () => {
    return (
        <div className='thanks__container gap-2 flex justify-center items-center flex-col'>
            <img src={logo} alt="logo" className='w-64' />
            <h1>¡Gracias por tu pago!</h1>
            <p>El link de conexión para la teleconsulta lo recibirás en tu correo</p>
            <Link to="/">Volver</Link>
        </div>
    )
}

export default Tel