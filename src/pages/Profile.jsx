import { useState, useEffect } from "react"
import Navbar from "../components/navbar/Navbar"
import Footer from "../components/Footer"
import ProfileFoto from "../components/profile/ProfileFoto"
import Cuppon from "../components/profile/Cupones"
import Preguntas from "../components/profile/Questions"
import Login from "../components/sesion/Login"
import Register from "../components/sesion/Register"
import Informacion from "../components/profile/Editar"
import "./profile.css"
import { Link } from "react-router-dom"

const Profile = () => {
    const [state, setState] = useState("");
    const [admin, setAdmin] = useState(true);
    const [username, setUsername] = useState("");

    const cerrar_sesion = () => {
        localStorage.removeItem('miToken');
        window.location.reload();
    }

    useEffect(() => {
        const token = localStorage.getItem('miToken');
        if (token) {
            setUsername(localStorage.getItem('name'));
        }
    }, [])

    return (
        <div className="flex flex-col">
            <div className="hidden lg:flex">
                <Navbar />
            </div>
            <main className="flex lg:py-0 py-6 flex-col lg:flex-row">
                <div className="lg:border-r-1 lg:border-custom lg:w-1/5 flex  flex-col justify-center items-center w-full">
                    <ProfileFoto imagen="" name={username !== "" ? username : "Sin perfil"} />

                    {
                        username !== "" ? (
                            <div className="w-full pt-6 lg:pt-0 flex flex-col justify-center items-center gap-2 lg:border-none border-b-1 border-custom pb-6 lg:pb-0">
                                {
                                    admin && (
                                        <p onClick={() => setState("crear_cupones")} className={`text-gray-800 flex gap-2 items-center w-2/3 justify-between cursor-pointer hover:underline ${state == "crear_cupones" && "text-pink-500"}`}>Crear cupones</p>
                                    )
                                }

                                <Link to="/begin" className={`text-gray-800 flex gap-2 items-center w-2/3 justify-between cursor-pointer hover:underline`}>Realizar consulta</Link>

                                {
                                    username !== "" && (<p onClick={cerrar_sesion} className="text-gray-800 flex gap-2 items-center w-2/3 justify-between cursor-pointer hover:underline">
                                        Cerrar sesión
                                    </p>)
                                }

                                <p className="text-gray-400 flex gap-2 items-center w-2/3 justify-between">
                                    Actividades
                                    <span className="icon-[fluent--presence-blocked-24-regular]"></span>
                                </p>
                                <p className="text-gray-400 flex gap-2 items-center w-2/3 justify-between">
                                    Consultas
                                    <span className="icon-[fluent--presence-blocked-24-regular]"></span>
                                </p>
                                <p onClick={() => setState("informacion")} className={`text-gray-800 flex gap-2 items-center w-2/3 justify-between cursor-pointer hover:underline ${state == "informacion" && "text-pink-500"}`}>
                                    Información del perfil

                                </p>

                                {
                                /*
                                    <p onClick={() => setState("preguntas")} className={`text-gray-800 flex gap-2 items-center w-2/3 justify-between cursor-pointer hover:underline ${state == "preguntas" && "text-pink-500"}`}>
                                    Preguntas frecuentes
                                    </p>
                                */
                                }
                                <p className="text-gray-400 flex gap-2 items-center w-2/3 justify-between">
                                    Preguntas frecuentes
                                    <span className="icon-[fluent--presence-blocked-24-regular]"></span>
                                </p>
                            </div>
                        ) : (
                            <p className="text-pink-500 cursor-pointer font-semibold hover:underline" onClick={() => setState("login")}>Iniciar sesión</p>
                        )
                    }
                </div>
                <div className="flex justify-center items-center w-full  overflow-auto mt-8 lg:mt-0">
                    {
                        state == "login" && (
                            <Login setState={setState} style="sesion__profile" />
                        )
                    }
                    {
                        state == "crear_cupones" && (
                            <Cuppon />
                        )
                    }
                    {
                        state == "register" && (
                            <Register setState={setState} style="sesion__profile" />
                        )
                    }
                    {
                        state == "preguntas" && (
                            <Preguntas />
                        )
                    }
                    {
                        state == "informacion" && (
                            <Informacion />
                        )
                    }
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Profile