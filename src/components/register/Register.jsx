import { useState } from "react";
import Captcha from "../Captcha";
import "../login/login.css";

const Register = ({ state, setRegistrarse, openLogin, changeLogin }) => {
    const [captchaOK, setCaptchaOK] = useState(false);
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

        if (captchaOK) {
            await fetch('https://api-dev.mimanualdelbebe.com/api/user/register', options)
                .then(response => response.json())
                .then(response => {
                    if (response.id) {
                        setEstiloText({ color: "blue" });
                        setMessage("Cuenta creada.");
                    } else {
                        setEstiloText({ color: "red" });
                        setMessage("No se ha podido crear la cuenta.");
                    }
                })
                .catch(err => {
                    setEstiloText({ color: "red" });
                    setMessage("No se ha podido crear la cuenta (servidor).");
                });
        } else {
            setEstiloText({ color: "red" });
            setMessage("Complete el Captcha.");
        }
    };

    return (
        <>
            <div className="login__container flex flex-col items-center justify-center bg-white text-gray-700">
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
                            {showPassword ? <span className="absolute left-1 top-0 icon-[mdi--hide-outline]"></span> : <span className="absolute left-1 top-0 icon-[mdi--show-outline]"></span>}
                        </button>
                    </div>
                </div>
                <div className="mt-4">
                    <Captcha setCaptchaOK={setCaptchaOK} />
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
