import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/logo-1.png";
import "./pages.css"

const ThanksTsbk = () => {
    const [aprobado, setAprobado] = useState(false);
    const [rechazado, setRechazado] = useState(false);
    const [question, setQuestion] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            const location = useLocation();
            const searchParams = new URLSearchParams(location.search);
            const refTransbank = searchParams.get('token');

            //para transbank, la data se saca del localStorage
            if (localStorage.getItem("userInfo") && localStorage.getItem("dataSend") && refTransbank) {
                if (localStorage.getItem("question")) {
                    setQuestion(true);
                }
                const data = {
                    userInfo: localStorage.getItem("userInfo"),
                    consulta: localStorage.getItem("dataSend")
                }
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: data
                };

                fetch(`https://api-dev.mimanualdelbebe.com/api/transbank/status-payment/${refTransbank}`, options)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
                        if (response.status === 1) {
                            setAprobado(true);
                        } else {
                            setRechazado(true);
                        }
                    })
                    .catch(err => {
                        setRechazado(true);
                        console.log("Error!: ", err)
                    });
            }
            else {
                setRechazado(true);
                console.log("Error!")
            }
        };

        fetchData();
    }, []);

    //funcion que elimina la data del localStorage
    const deleteData = () => {
        if (localStorage.getItem("userInfo") && localStorage.getItem("dataSend")) {
            localStorage.removeItem("dataSend");
            localStorage.removeItem("userInfo");
        }
    }

    return (
        <div className='thanks__container gap-2 flex justify-center items-center flex-col'>
            <div className='w-64'>
                <img src={logo} alt="logo" />
            </div>
            {
                aprobado && (<div>
                    <h1>¡Gracias por tu pago!</h1>
                    <p>{question ? "La respuesta del doctor llegará a tu correo en menos de 3 horas" : "El link de conexión para la teleconsulta lo recibirás en tu correo"}  </p>
                    <Link onClick={deleteData} to="/">Volver</Link>
                </div>)
            }
            {
                (!aprobado && !rechazado) && (
                    <div>
                        <p>Procesando...</p>
                    </div>
                )
            }
            {
                rechazado && (
                    <div>
                        <p>Algo salió mal...</p>
                        <Link to="/" onClick={deleteData}>Volver</Link>
                    </div>
                )
            }
        </div>
    )
}

export default ThanksTsbk;