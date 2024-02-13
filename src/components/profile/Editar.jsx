import React, { useEffect, useState } from 'react'

const Editar = () => {
  const [userInfo, setUserInfo] = useState({
    name: localStorage.getItem('name'),
    lastname: "",
    age: "",
    email: localStorage.getItem('email'),
  });

  return (
    <div className='flex flex-col justify-center items-center gap-2 my-4 w-1/2 lg:my-0 text-gray-600'>
      <p className='text-2xl text-custom underline'>Información del perfil</p>
      <div className='flex w-full justify-between text-lg bg-gray-100 rounded p-2'>
        <p><b>Nombre</b>: {userInfo["name"]} </p>
        <span className="icon-[uil--edit] text-gray-500 hover:text-gray-600 cursor-pointer"></span>
      </div>
      <div className='flex w-full justify-between text-lg bg-gray-100 rounded p-2'>
        <p><b>Apellido</b>: </p>
        <span className="icon-[uil--edit] text-gray-500 hover:text-gray-600 cursor-pointer"></span>
      </div>
      <div className='flex w-full justify-between text-lg bg-gray-100 rounded p-2'>
        <p><b>Correo</b>: {userInfo["email"]}</p>
        <span className="icon-[uil--edit] text-gray-500 hover:text-gray-600 cursor-pointer"></span>
      </div>
      <div className='flex w-full justify-between text-lg bg-gray-100 rounded p-2'>
        <p><b>Edad</b>: </p>
        <span className="icon-[uil--edit] text-gray-500 hover:text-gray-600 cursor-pointer"></span>
      </div>

    </div>
  )
}

export default Editar