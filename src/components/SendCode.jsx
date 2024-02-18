import React, {useState} from 'react'
import "./send.css"

const SendCode = ({dataSend, userInfo, code, question, setShowSend}) => {
    const [cargando, setCargando] = useState(false);
    const enviarData = async(e) =>{
        e.preventDefault();

        setCargando(true);
        
        const data = {
            code: code, 
            userInfo: userInfo,
            consulta: dataSend
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        await fetch('https://api-dev.mimanualdelbebe.com/api/promocodes/status-code', options)
                .then(response => response.json())
                .then(response => {
                    if(response.status === 1){
                        setCargando(false);
                        window.location.href = `/thanksC${question ? "p" : "t"}`;
                    }else{
                        window.location.href = `/error`;
                    }
                })
                .catch(err => {
                    console.log("Error de servidor.")
                });
                
        }

    return (
        <>
        <div className='sendcode__container rounded z-9999 top-1/2 left-1/2 flex flex-col gap-2 justify-center items-center p-6 bg-gray-800 fixed'>
            <h2 className='title font-semibold'>¿Desea pagar con el código?</h2>
            <button className='p-2 bg-celeste rounded w-full text-white' onClick={enviarData}>Aceptar</button>
            <button className='p-2 bg-celeste w-full rounded text-white' onClick={()=>{
                setShowSend(false);
            }}>Rechazar</button>

            {
                cargando && (<p className='text-lg text-white'>Cargando...</p>)
            }
            
        </div>
        <div className='overlay__send'></div>
        </>
    )
}

export default SendCode