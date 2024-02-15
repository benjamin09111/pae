import { useState } from "react";
import "./login.css";

const Login = ({ state, changeState, setLogeado, openRegister }) => {
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

        if (user !== "" && password !== "") {
            await fetch('https://api-dev.mimanualdelbebe.com/api/user/login', options)
                .then(response => response.json())
                .then(response => {
                    if (response.msg == "Error de credenciales!") {
                        setEstiloText({ color: "red" });
                        setMessage("Error de credenciales.");
                    } else if (response.login) {
                        const token = response.token
                        const user_id = response.user.id
                        const user_email = response.user.user_email

                        localStorage.setItem('miToken', JSON.stringify(token));
                        localStorage.setItem('user_id', JSON.stringify(user_id));
                        localStorage.setItem('email', user_email);

                        //guardamos en el local directo
                        localStorage.setItem('name', response.user.wp_usermeta["wpcf_f_name"]);
                        localStorage.setItem('lastname', response.user.wp_usermeta["wpcf_l_name"]);
                        localStorage.setItem('age', response.user.wp_usermeta["wpcf_age"]);
                        localStorage.setItem('country', response.user.wp_usermeta["wpcf_country"]);

                        //cerrar login y ponerle logeado
                        changeState();
                        setLogeado(true);
                    } else {
                        setEstiloText({ color: "red" });
                        setMessage("Error desconocido.");
                    }
                })
                .catch(err => {
                    setEstiloText({ color: "red" });
                    setMessage("No se ha podido establecer sesión (servidor).");
                });
        } else {
            setEstiloText({ color: "red" });
            setMessage("Rellene los campos.");
        }

        /*
                if (response.msg === "Error de credenciales!") {
                    setEstiloText({ color: "red" });
                    setMessage("Error de credenciales.");
                } else if (response.token != "") {
                    const token = response.token
                    const user_id = response.user.id
                    const user_email = response.user.user_email
                    
                    localStorage.setItem('miToken', JSON.stringify(token));
                    localStorage.setItem('user_id', JSON.stringify(user_id));
                    localStorage.setItem('email', user_email);

                    //guardamos en el local directo
                    localStorage.setItem('name', response.user.wp_usermeta["wpcf_f_name"]);
                    localStorage.setItem('lastname', response.user.wp_usermeta["wpcf_l_name"]);
                    localStorage.setItem('age', response.user.wp_usermeta["wpcf_age"] );
                    localStorage.setItem('country', response.user.wp_usermeta["wpcf_country"]);

                    //cerrar login y ponerle logeado
                    changeState();
                    setLogeado(true);
                } else if (user == "" || password == "") {
                    setEstiloText({ color: "red" });
                    setMessage("Rellene los campos.");
                }
                else {
                    setEstiloText({ color: "red" });

                    setMessage("No se ha podido establecer sesión.");
                    console.log(response)
                }
                */

    };

    return (
        <>
            <div className="login__container flex flex-col items-center justify-center bg-white py-8 rounded-lg text-gray-700 gap-6">
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

                <button
                    className="underline"
                    onClick={() => {
                        changeState();
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
