import React from 'react'
import logo from "../../assets/logo-1.png";
import "../pages.css"

const Preg = () => {
    return (
        <div className='thanks__container gap-2 flex justify-center items-center flex-col'>
            <img src={logo} alt="logo" className='w-64' />
            <h1>¡Gracias por tu pago!</h1>
            <p>La respuesta del doctor llegará a tu correo en menos de 3 horas</p>
            <Link to="/">Volver</Link>
        </div>
    )
}

export default Preg