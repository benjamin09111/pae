import { useState } from 'react'

const Cupones = () => {
    const [codigo, setCodigo] = useState("");

    const enviar = () => {
        //enviar código de descuento
        console.log(codigo);
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
            <div className='flex flex-col mt-4 w-1/2 justify-center items-center'>
                <div className='flex w-full bg-gray-100 p-2 rounded-lg'>
                    Códigos creados: 
                </div>
            </div>
        </div>
    )
}

export default Cupones