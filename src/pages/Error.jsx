import logo from "../assets/logo-1.png";
import "./pages.css"

const Error = () => {
    return (
        <div className='thanks__container gap-2 flex justify-center items-center flex-col'>
            <img src={logo} alt="logo" />
            <h1>Error</h1>
            <p>Vuelva a intentar.</p>
            <a href="/">Volver</a>
        </div>
    )
}

export default Error