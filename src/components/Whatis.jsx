import { FaCheckCircle } from "react-icons/fa"
import whatis_doctor from "../assets/doctor.webp"
import {Link} from "react-router-dom"

const Whatis = () => {
    return (
        <div className='whatis__container' id='whatispae'>
            <div className='whatis__image'>
                <img src={whatis_doctor} alt="doctor" />
            </div>
            <div className='whatis__content'>
                <h2 className="text-center">¿Qué es Pregúntale al Experto?</h2>
                <p>Te permite consultar especialistas de manera rápida o solicitar una Teleconsulta. Resuelve tus dudas de forma segura, sencilla y confiable.</p>
                <div className='whatis__check-list'>
                    <p className="flex gap-2"><FaCheckCircle /> <b>Respuestas a consultas en menos de 3 horas</b></p>
                    <p className="flex gap-2"><FaCheckCircle /> <b>Teleconsultas de 15 minutos con médicos especialistas</b></p>
                </div>
                <div className='whatis__content-buttons'>
                        <Link className='' to='/begin'>
                            Iniciar consulta
                        </Link>
                    <a target='_blank' href='https://mimanualdelbebe.com'>Mi Manual del Bebé</a>
                </div>
            </div>
        </div>
    )
}

export default Whatis