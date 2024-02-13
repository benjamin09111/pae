import { useState } from "react";
import "./sesion.css";

const Register = ({ setState, style }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [dataSend, setDataSend] = useState({
        name: "",
        lastname: "",
        age: "",
        email: "",
        password: "",
    });

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [message, setMessage] = useState("");
    const [estiloText, setEstiloText] = useState({ color: "black" });

    const registrarse = async () => {
        setEstiloText({ color: "black" });
        setMessage("Cargando...");

        const data = dataSend;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        await fetch('https://api-dev.mimanualdelbebe.com/api/user/register', options)
            .then(response => response.json())
            .then(response => {
                if (response && response.id) {
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
    };

    return (
        <div className={`flex flex-col items-center justify-center bg-white py-8 rounded-lg text-gray-700 gap-2 ${style}`}>
            <h4 className="title text-4xl mb-2">Registro</h4>

            <div>
                <p>Nombre</p>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={dataSend.name}
                    onChange={(e) => setDataSend({ ...dataSend, name: e.target.value })}
                />
            </div>
            <div>
                <p>Apellido</p>
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={dataSend.lastname}
                    onChange={(e) => setDataSend({...dataSend, lastname: e.target.value})}
                />
            </div>
            <div>
                <p>Edad</p>
                <input
                    type="text"
                    id="age"
                    name="age"
                    value={dataSend.age}
                    onChange={(e) => setDataSend({...dataSend, age: e.target.value})}
                />
            </div>
            <div>
                <p>Email</p>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={dataSend.email}
                    onChange={(e) => setDataSend({...dataSend, email: e.target.value})}
                />
            </div>
            <div>
                <p>Contraseña</p>
                <div style={{ display: "flex", gap: "4" }}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={dataSend.password}
                        onChange={(e) => setDataSend({...dataSend, password: e.target.value})}
                    />
                    <button className="relative" onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <span className="absolute left-1 top-0 icon-[mdi--hide-outline]"></span> : <span className="absolute left-1 top-0 icon-[mdi--show-outline]"></span>}
                    </button>
                </div>
            </div>
            <button className="button-form my-4" onClick={registrarse}>
                Registrar cuenta
            </button>

            <p style={estiloText}>{message}</p>

            <p className="underline text-xl" onClick={()=>setState("login")}>Iniciar sesión</p>
        </div>
    )
}

export default Register