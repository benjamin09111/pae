import { useEffect, useState } from "react"
import embarazo from "../../assets/embarazo_1.webp"
import bebe from "../../assets/bebe_1.webp"
import postparto from "../../assets/postparto_1.webp"
import Checkout from "../../components/epayco/Checkout"
import Input from "./Input"
import "./styleform.css"

const FormularioPago = ({ login, agregarAutomaticaUsuario, title, question, precio, setLogin, userInfo, changeUserInfo, changeState, tipo, dataEmbarazo, dataPostparto, dataBebe, changeEmbarazo, changeBebe, changePostparto }) => {

    const [verificado, setVerificado] = useState(false);
    const [textoCodigo, setTextoCodigo] = useState("");
    const [styleText, setStyleText] = useState("style__text-black");
    const [name, setName] = useState("");
    const [cuppon, setCuppon] = useState("");

    //funcion que verifica si es que no ha llegado algo o hay algun error
    const [messageError, setMessageError] = useState("");

    const canjearCodigo = async () => {
        setStyleText("style__text-black")
        setTextoCodigo("Verificando código...");

        setTimeout(() => {
            // Aquí iría tu lógica de llamada al backend y recibir respuesta
            //la variable del cuppon se llama: cuppon
            //debes cambiar con setVerificado cuando se verifique, verificado indica si pueda usar cupón
            //sacar el timeout por el await

            if (verificado) {
                setStyleText("style__text-blue");
                setTextoCodigo("¡Código aprobado!");
            } else {
                setStyleText("style__text-red");
                setTextoCodigo("Código no aprobado.");
            }
        }, 500);
    };

    useEffect(() => {
        const token = localStorage.getItem('miToken');

        if (token) {
            setName(localStorage.getItem('name'));
            //agregar Info automática al usuario: email, name, lastname, age
            agregarAutomaticaUsuario("email", localStorage.getItem('email'));
            agregarAutomaticaUsuario("name", localStorage.getItem('name'));
            agregarAutomaticaUsuario("lastname", localStorage.getItem('lastname'));
            agregarAutomaticaUsuario("age", localStorage.getItem('age'));
        }
    }, [login])

    return (
        <form className="formulario__de__pago flex 2xl:flex-row flex-col justify-evenly items-start pt-8 relative w-full">

            <div className="2xl:w-1/3  flex flex-col gap-12">
                <h3 className="2xl:text-start formulario__de__pago-h3 text-3xl text-center font-semibold">Ficha médica - {tipo === "bebe" ? "Bebé" : tipo === "embarazo" ? "Embarazo" : tipo === "postparto" ? "Postparto" : ""}</h3>
                <b className="top-1 right-1 absolute text-2xl cursor-pointer" onClick={() => {
                    changeState();
                    setLogin(false);
                }}>&times;</b>
                <img className="w-full" src={
                    tipo === "bebe" ? bebe :
                        tipo === "embarazo" ? embarazo :
                            tipo === "postparto" ? postparto : ""
                } alt="imagen" />
            </div>

            <div className="flex mt-6 w-full 2xl:mt-0 justify-center items-center flex-col gap-3 2xl:w-1/3">
                <h3 className="font-bold text-center mb-6 text-3xl 2xl:text-start formulario__de__pago-h3">{question ? `Información para tu pregunta` : "Información para la teleconsulta"}</h3>
                {
                    name === "" && (
                        <>
                            <Input name="Nombre madre" userInfo={userInfo.name} changeUserInfo={changeUserInfo} id="name" icon="" />

                            <Input name="Apellido madre" userInfo={userInfo.lastname} changeUserInfo={changeUserInfo} id="lastname" icon="" />

                            <Input name="Edad madre" userInfo={userInfo.age} changeUserInfo={changeUserInfo} id="age" icon="icon-[clarity--email-solid]" />
                            <Input name="Correo madre" userInfo={userInfo.email} changeUserInfo={changeUserInfo} id="email" icon="" />

                            {
                                /*
                                    <Input name="País" userInfo={userInfo.country} changeUserInfo={changeUserInfo} id="country" icon="icon-[mdi--location]" />
                                */
                            }
                        </>
                    )
                }
                {tipo === "embarazo" &&
                    <>
                        <Input name="Fecha de nacimiento (madre)" userInfo={dataEmbarazo.birthmom} changeUserInfo={changeEmbarazo} id="birthmom" icon="icon-[clarity--date-solid]" placeholder=""/>

                        <Input name="Fecha estimada del parto" userInfo={dataEmbarazo.birthdate} changeUserInfo={changeEmbarazo} id="birthdate" icon="icon-[clarity--date-solid]" placeholder=""/>

                        <Input name="Semanas de embarazo" userInfo={dataEmbarazo.weeks} changeUserInfo={changeEmbarazo} id="weeks" icon="icon-[clarity--date-solid]" placeholder=""/>

                        <Input name="Tipo de embarazo" userInfo={dataEmbarazo.birthtype} changeUserInfo={changeEmbarazo} id="birthtype" icon="icon-[healthicons--pregnant]" placeholder="(simple / múltiple)" />

                        <Input name="He estado embarazada" userInfo={dataEmbarazo.pregnantbefore} changeUserInfo={changeEmbarazo} id="pregnantbefore" icon="icon-[healthicons--pregnant]" placeholder="sí / no"/>
                    </>
                }
                {tipo === "bebe" &&
                    <>
                        <Input name="Fecha de nacimiento (bebé)" userInfo={dataBebe.birthbaby} changeUserInfo={changeBebe} id="birthbaby" icon="icon-[clarity--date-solid]" placeholder="" />

                        <Input name="Estatura del bebé" userInfo={dataBebe.babyheight} changeUserInfo={changeBebe} id="babyheight" icon="icon-[mdi--human-male-height]" placeholder="Centímetros (opcional)"/>

                        <Input name="Peso del bebé" userInfo={dataBebe.babyweight} changeUserInfo={changeBebe} id="babyweight" icon="icon-[material-symbols--weight]" placeholder="Kilogramos (opcional)" />
                    </>
                }
                {tipo === "postparto" &&
                    <>
                        <Input name="Fecha último parto" userInfo={dataPostparto.lastbirthdate} changeUserInfo={changePostparto} id="lastbirthdate" icon="icon-[clarity--date-solid]" />

                        <Input name="Tipo de parto" userInfo={dataPostparto.birthtype} changeUserInfo={changePostparto} id="birthtype" icon="icon-[healthicons--pregnant]" />

                        <Input name="He estado embarazada" userInfo={dataPostparto.pregnantbefore} changeUserInfo={changePostparto} id="pregnantbefore" icon="icon-[healthicons--pregnant]" placeholder="sí / no"/>
                    </>
                }
                {question &&
                    (<div className="contenedorpagar__pregunta">
                        <h4 className="title text-center text-3xl" >¿Cuál es su pregunta?</h4>
                        {tipo === "embarazo" &&
                            (
                                <textarea name="question" id="question" cols="20" rows="4" value={dataEmbarazo.question} onChange={changeEmbarazo} placeholder="Ingrese su pregunta"></textarea>
                            )
                        }
                        {tipo === "bebe" &&
                            (
                                <textarea name="question" id="question" cols="20" rows="4" value={dataBebe.question} onChange={changeBebe} placeholder="Ingrese su pregunta"></textarea>
                            )
                        }

                        {tipo === "postparto" &&
                            (
                                <textarea name="question" id="question" cols="20" rows="4" value={dataPostparto.question} onChange={changePostparto} placeholder="Ingrese su pregunta"></textarea>
                            )
                        }
                    </div>
                    )}
            </div>

            <div className="2xl:w-1/4 mt-6 2xl:mt-0 pagar__buton-container flex flex-col justify-center items-center w-full gap-4 text-gray-700">
                <h3 className="formulario__de__pago-h3 font-bold text-3xl text-start">Pago</h3>

                <div className="flex mt-4 flex-col gap-1 w-full items-center justify-center ">
                    <p>Vas a pagar un total de <b>${verificado ? 0 : precio}</b></p>
                    <p className="underline text-md">Elige tu método de pago: </p>

                    <button className="btnn bg-pink-500 hover:bg-pink-600 w-10/12 md:w-1/3  border-none rounded text-white px-4 py-2" onClick={
                        () => {
                            //boton transbank
                        }
                    }><p>Pagar con <b>Transbank</b></p> </button>

                    <Checkout precio={verificado ? 0 : precio} title={title} tematica={tipo} dataSend={tipo === "embarazo" ? dataEmbarazo : (tipo === "bebe" ? dataBebe : dataPostparto)} userInfo={userInfo} question={question} />

                    <div className="codigo__container">
                        <h5 className="text-md title">Código de invitación</h5>
                        <input
                            type="text"
                            name="code"
                            id="code"
                            value={cuppon}
                            onChange={(e) => setCuppon(e.target.value)}
                        />
                        <button type="button" onClick={canjearCodigo}>Canjear código</button>
                        <p className={styleText}>{textoCodigo}</p>
                    </div>

                    <button className="btnn bg-pink-500 hover:bg-pink-600 w-10/12 md:w-1/3
                border-none rounded text-white px-4 py-2" onClick={
                            () => {
                                if (verificado) {
                                    precio = 0;
                                    //mandar los correos altiro y mandar el cuppón, la variable se llama cuppon
                                    
                                } else {
                                    setMessageError("No has ingresado un código válido.");
                                }
                            }
                        }><p>Pagar con el <b>código</b></p> </button>

                    <b className="text-red-600">{messageError}</b>
                </div>
            </div>
        </form>
    )
}

export default FormularioPago