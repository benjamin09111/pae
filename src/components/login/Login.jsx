import { useState } from "react";
import React from "react";
import ReCaptcha from "../Captcha";
import "./login.css";

const Login = ({ state, changeState, setInvitado, setLogeado, openRegister }) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [estiloText, setEstiloText] = useState({ color: "black" });
    const myCaptchaRef = React.createRef();
    const logearse = async () => {
        
        setEstiloText({ color: "black" });
        setMessage("Cargando...");
        
        const data = {
            email: user,
            password: password
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        if(!Object.values(data).some(value => value === "") || myCaptchaRef.current.getValue())
        await fetch('https://api-dev.mimanualdelbebe.com/api/user/login', options)
            .then(response => response.json())
            .then(response => {
                if (response.msg === "Error de credenciales!") {
                    setEstiloText({ color: "red" });
                    setMessage("Error de credenciales.");
                } else if (response.token != "") {
                    const token = response.token

                    //habra que cambiar esto, ahora llegará diferente la data, usuario.algo
                    const usuario = response.user

                    localStorage.setItem('miToken', token)
                    localStorage.setItem('user', usuario)
                    localStorage.setItem('email', usuario.user_email)
                    localStorage.setItem('name', usuario.wp_usermeta[0].meta_value)
                    localStorage.setItem('lastname', usuario.wp_usermeta[1].meta_value)
                    //FALTA EDAD
                    //localStorage.setItem('age',usuario.user_email)

                    changeState();
                    setInvitado(false);
                    setLogeado(true);
                } else {
                    myCaptchaRef.current.reset();
                    setEstiloText({ color: "red" });
                    setMessage("No se ha podido establecer sesión.");
                    console.log(response)
                }
            })
            .catch(err => {
                myCaptchaRef.current.reset();
                setEstiloText({ color: "red" });
                setMessage("No se ha podido establecer sesión (servidor).");
                console.log(err);
            });
        else{
            myCaptchaRef.current.reset();
            setEstiloText({ color: "red" });
            setMessage("Rellena todos los campos.");
        }
    };

    return (
        <>
            <div className="login__container flex flex-col items-center justify-center bg-white py-8 rounded-lg text-gray-700 gap-6">
                <h4 className="title text-4xl">Inicia sesión</h4>
                <div>
                    <p>Email</p>
                    <input
                        required
                        type="text"
                        id="user"
                        name="user"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </div>
                <div>
                    <p>Contraseña</p>
                    <input
                        required
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <ReCaptcha CaptchaRef={myCaptchaRef} required/>
                </div>
                <button className="button-form" onClick={logearse}>
                    Inicia sesión
                </button>

                <p style={estiloText}>{message}</p>

                <button
                    className="underline"
                    onClick={() => {
                        changeState();
                        setInvitado(true);
                    }}
                >
                    Seguir como invitado
                </button>

                <a style={{ cursor: "pointer", textDecoration: "underline", fontSize: "1.1rem" }} onClick={openRegister} >Crearme una cuenta</a>
            </div>
            {state && <div className="overlay__fondo"></div>}
        </>
    );
};

export default Login;
