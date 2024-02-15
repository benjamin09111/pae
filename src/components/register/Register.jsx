import React, { useState } from "react";
import ReCaptcha from "../Captcha";
import "../login/login.css";

const Register = ({ state, setRegistrarse, openLogin, changeLogin }) => {
    const myCaptchaRef = React.createRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [country, setCountry] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [message, setMessage] = useState("");
    const [estiloText, setEstiloText] = useState({ color: "black" });

    const registrarse = async () => {

        setEstiloText({ color: "black" });
        setMessage("Cargando...");

        const data = {
            name: name,
            lastname: lastname,
            age: age,
            country: country,
            email: email,
            password: password,
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        if (!Object.values(data).some(value => value === "") && myCaptchaRef != null && myCaptchaRef.current.getValue()) {
            await fetch('https://api-dev.mimanualdelbebe.com/api/user/register', options)
                .then(response => response.json())
                .then(response => {
                    if (response.id) {
                        setEstiloText({ color: "blue" });
                        setMessage("Cuenta creada. Inicie sesión.");
                    } else {
                        if (myCaptchaRef.current.getValue())
                            myCaptchaRef.current.reset();
                        setEstiloText({ color: "red" });
                        setMessage("No se ha podido crear la cuenta.");
                    }
                })
                .catch(err => {
                    myCaptchaRef.current.reset();
                    setEstiloText({ color: "red" });
                    setMessage("No se ha podido crear la cuenta.");
                });
        } else {
            myCaptchaRef.current.reset();
            setEstiloText({ color: "red" });
            setMessage("Complete todos los campos.");
        }
    };

    return (
        <>
            <div className="login__container rounded flex flex-col items-center justify-center bg-white text-gray-700">
                <h4 className="title text-4xl mb-2 mt-2">Registro</h4>

                <div>
                    <p>Nombre</p>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <p>Apellido</p>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <p>Edad</p>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div>
                    <p>Email</p>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <p>País</p>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div>
                    <p>Contraseña</p>
                    <div style={{ display: "flex", gap: "4" }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="relative" onClick={handleTogglePasswordVisibility}>
                            {showPassword ? <span className="absolute left-1 top-1/4 icon-[mdi--hide-outline]"></span> : <span className="absolute left-1 top-1/4 icon-[mdi--show-outline]"></span>}
                        </button>
                    </div>
                </div>
                <div className="mt-4">
                    <ReCaptcha CaptchaRef={myCaptchaRef} required />
                </div>
                <button className="button-form my-4" onClick={registrarse}>
                    Registrar cuenta
                </button>

                <p style={estiloText}>{message}</p>

                <button
                    className="underline"
                    onClick={() => {
                        changeLogin(false);
                        setRegistrarse(false);
                    }}
                >Seguir como invitado</button>
                <p className="mb-2 text-center">Ya tengo una cuenta. <b style={{ textDecoration: "underline", cursor: "pointer" }} onClick={openLogin}>Iniciar sesión.</b> </p>
            </div>
            {state && <div className="overlay__fondo"></div>}
        </>
    );
};

export default Register;
