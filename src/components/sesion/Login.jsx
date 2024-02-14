import { useState } from "react";
import "./sesion.css";

const Login = ({setState, style}) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [estiloText, setEstiloText] = useState({ color: "black" });

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

        await fetch('https://api-dev.mimanualdelbebe.com/api/user/login', options)
            .then(response => response.json())
            .then(response => {

                if (response.msg === "Error de credenciales!") {
                    setEstiloText({ color: "red" });
                    setMessage("Error de credenciales.");
                    return;
                } else if (user === "" || password === "") {
                    setEstiloText({ color: "red" });
                    setMessage("Rellene los campos.");
                } else if (response.id != "") {
                    const token = response.token
                    const user_id = response.user.id
    
                    localStorage.setItem('miToken', JSON.stringify(token));
                    localStorage.setItem('user_id', JSON.stringify(user_id));
                
                    setState("");
                    window.location.reload();
                }
                else {
                    setEstiloText({ color: "red" });
                    setMessage("No se ha podido establecer sesión.");
                }
            }).catch(err => {
                console.log(err);
                setEstiloText({ color: "red" });
                setMessage("Error al conectar con el servidor.");
            });
    };

    return (
        <>
            <div className={`${style} lg:my-32 flex flex-col items-center justify-center bg-white py-8 rounded-lg text-gray-700 gap-6`}>
                <h4 className="title text-4xl">Inicia sesión</h4>
                <div>
                    <p>Email</p>
                    <input
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
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="button-form" onClick={logearse}>
                    Inicia sesión
                </button>

                <p style={estiloText}>{message}</p>

                <a className="underline text-xl" onClick={()=> setState("register")} >Crearme una cuenta</a>
            </div>
        </>
    );
};

export default Login;
