import { useState } from "react";
import "./sesion.css";

const Login = ({ setState, style }) => {
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

                        localStorage.setItem('miToken', token);
                        localStorage.setItem('user_id', user_id);
                        localStorage.setItem('email', user_email);

                        //guardamos en el local directo
                        localStorage.setItem('name', response.user.wp_usermeta["wpcf_f_name"]);
                        localStorage.setItem('lastname', response.user.wp_usermeta["wpcf_l_name"]);
                        localStorage.setItem('age', response.user.wp_usermeta["wpcf_age"]);
                        localStorage.setItem('country', response.user.wp_usermeta["wpcf_country"]);

                        setState("");
                        window.location.reload();
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

                <a className="underline text-xl" onClick={() => setState("register")} >Crearme una cuenta</a>
            </div>
        </>
    );
};

export default Login;
