import { useState } from 'react'

const Cupones = ({changeState}) => {
    const [codigo, setCodigo] = useState("");
    const [codigos, setCodigos] = useState([]);
    const [message, setMessage] = useState("");

    const getCodes = async () => {
        const token = localStorage.getItem("miToken")
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : token
            },
        };

        await fetch('https://api-dev.mimanualdelbebe.com/api/pae/allPromocodes', options)
            .then(response => response.json())
            .then(response => {
                //
                if(response.length > 0){
                    setCodigos(response);
                }else{
                    setMessage("Error inesperado.");
                }
            })
            .catch(err => {
                setMessage("Error inesperado.");
            });
    }

    const enviar = async () => {
        //enviar código de descuento
        const token = localStorage.getItem("miToken")

        console.log(token)

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : token
            },
        };

        await fetch('https://api-dev.mimanualdelbebe.com/api/pae/createPromocode', options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if(response.msg == "token no es válido"){
                    changeState("vuelva");
                }else if(response.id){
                    setMessage("Código creado.");

                    setTimeout(()=>{
                        setMessage("");
                    }, 2000)

                }else{
                    setMessage("Error inesperado.");
                }
            })
            .catch(err => {
                setMessage("Error inesperado.");
            });
    }

    return (
        <div className='flex w-full flex-col gap-2 justify-center items-center'>
            <h2 className='text-xl text-center font-semibold'>Crear código de descuento</h2>
            <div className='flex  gap-3 lg:flex-row flex-col flex-wrap'>
                <input
                    className='input__cuppon'
                    type="text"
                    name='codigo'
                    id='codigo'
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                />
                <button className='button__cuppon' onClick={enviar}>Crear</button>
                
            </div>
            <p className='text-center text-blue-500 text-lg'>{message}</p>
            <div className='flex flex-col mt-4 w-1/2 justify-center items-center'>
                <div className='flex items-center justify-center p-2 rounded-lg'>
                    <button onClick={getCodes} className='bg-gray-400 hover:bg-gray-500 text-white p-2 min-w-48 text-center rounded'>Obtener códigos creados</button>
                </div>
                <div className='flex max-h-32 overflow-auto rounded mt-4 w-full flex-col bg-gray-100 rounded'>
                    {
                        //hacer un mapeo de todos los códigos: code, status (bool)
                        codigos.map(codigo =>(
                            <div className='text-gray-900 px-2 py-1 flex justify-between items-center w-full'>
                                <p>{codigo.code}</p>
                                {codigo.status ? (<p className='text-blue-500'>Usado</p>) : (<p className='text-red-500'>Disponible</p>)}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Cupones