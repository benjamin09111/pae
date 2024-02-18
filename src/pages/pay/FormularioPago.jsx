import { useEffect, useState } from "react"
import embarazo from "../../assets/embarazo_1.webp"
import bebe from "../../assets/bebe_1.webp"
import postparto from "../../assets/postparto_1.webp"
import Checkout from "../../components/epayco/Checkout"
import Input from "./Input"
import Transbank from "../../components/Transbank"
import SendCode from "../../components/SendCode"
import "./styleform.css"

const FormularioPago = ({ agregarAutomaticaUsuario, logeado, title, question, precio, setLogin, userInfo, changeUserInfo, changeState, tipo, dataEmbarazo, dataPostparto, dataBebe, changeEmbarazo, changeBebe, changePostparto }) => {

    useEffect(() => {
        const token = localStorage.getItem('miToken');
        if (token && logeado) {
            agregarAutomaticaUsuario("name", localStorage.getItem("name"))
            agregarAutomaticaUsuario("lastname", localStorage.getItem("lastname"))
            agregarAutomaticaUsuario("age", localStorage.getItem("age"))
            agregarAutomaticaUsuario("country", localStorage.getItem("country"))
            agregarAutomaticaUsuario("email", localStorage.getItem("email"))
        }
    }, [])

    const [showSend, setShowSend] = useState(false);

    const [verificado, setVerificado] = useState(false);
    const [textoCodigo, setTextoCodigo] = useState("");
    const [styleText, setStyleText] = useState("style__text-black");
    const [cuppon, setCuppon] = useState("");

    //funcion que verifica si es que no ha llegado algo o hay algun error
    const [messageError, setMessageError] = useState("");

    const canjearCodigo = async () => {
        setStyleText("style__text-black")
        setTextoCodigo("Verificando código...");

        const data = {
            "code": cuppon
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        await fetch('https://api-dev.mimanualdelbebe.com/api/promocodes/confirm-code', options)
            .then(response => response.json())
            .then(response => {
                console.log(response);

                if (response.status === 1) {
                    setStyleText("style__text-red")
                    setTextoCodigo("Código aprobado!")
                    setVerificado(true);
                    setShowSend(true);
                } else {
                    setStyleText("style__text-red")
                    setTextoCodigo("Código incorrecto")
                }

                
            })
            .catch(err => {
                console.log(response);
                setStyleText("style__text-red")
                setTextoCodigo("Error!")
            });

            
        
    }

    return (
        <form className="formulario__de__pago flex flex-col justify-evenly items-center  pt-8 relative w-full">

            <div className="flex flex-col justify-center items-start 2xl:justify-evenly gap-4 2xl:flex-row">
                <div className="2xl:w-1/3 justify-center items-center flex flex-col gap-12">
                    <h3 className="2xl:text-start formulario__de__pago-h3 text-3xl text-center font-semibold">Ficha médica - {tipo === "bebe" ? "Bebé" : tipo === "embarazo" ? "Embarazo" : tipo === "postparto" ? "Postparto" : ""}</h3>
                    <b className="top-1 right-1 absolute text-2xl cursor-pointer" onClick={() => {
                        changeState();
                        setLogin(false);
                    }}>&times;</b>
                    <img className="md:w-1/2 w-full 2xl:w-full" src={
                        tipo === "bebe" ? bebe :
                            tipo === "embarazo" ? embarazo :
                                tipo === "postparto" ? postparto : ""
                    } alt="imagen" />
                </div>

                <div className="flex flex-col pt-6 xl:pt-0 gap-4 justify-center items-center w-full 2xl:w-1/2">
                    <h3 className="font-bold text-center mb-6 text-3xl 2xl:text-start formulario__de__pago-h3">{question ? `Información para tu pregunta` : "Información para la teleconsulta"}</h3>
                    {
                        !logeado && (
                            <>
                                <Input name="Nombre madre" userInfo={userInfo.name} changeUserInfo={changeUserInfo} id="name" icon="" />
                                <Input name="Apellido madre" userInfo={userInfo.lastname} changeUserInfo={changeUserInfo} id="lastname" icon="" />
                                <Input name="Edad madre" userInfo={userInfo.age} changeUserInfo={changeUserInfo} id="age" icon="icon-[clarity--email-solid]" />
                                <Input name="Correo madre" userInfo={userInfo.email} changeUserInfo={changeUserInfo} id="email" icon="" />
                                <Input name="País" userInfo={userInfo.country} changeUserInfo={changeUserInfo} id="country" icon="icon-[mdi--location]" />
                            </>
                        )
                    }
                    {tipo === "embarazo" &&
                        <>
                            <Input name="Fecha de nacimiento (madre)" userInfo={dataEmbarazo.birthmom} changeUserInfo={changeEmbarazo} id="birthmom" icon="icon-[clarity--date-solid]" placeholder="Tu respuesta..." />

                            <Input name="Fecha estimada del parto" userInfo={dataEmbarazo.birthdate} changeUserInfo={changeEmbarazo} id="birthdate" icon="icon-[clarity--date-solid]" placeholder="Tu respuesta..." />

                            <Input name="Semanas de embarazo" userInfo={dataEmbarazo.weeks} changeUserInfo={changeEmbarazo} id="weeks" icon="icon-[clarity--date-solid]" placeholder="Tu respuesta..." />

                            <Input name="Tipo de embarazo" userInfo={dataEmbarazo.birthtype} changeUserInfo={changeEmbarazo} id="birthtype" icon="icon-[healthicons--pregnant]" placeholder="(simple / múltiple)" />

                            <Input name="He estado embarazada" userInfo={dataEmbarazo.pregnantbefore} changeUserInfo={changeEmbarazo} id="pregnantbefore" icon="icon-[healthicons--pregnant]" placeholder="sí / no" />
                        </>
                    }
                    {tipo === "bebe" &&
                        <>
                            <Input name="Fecha de nacimiento (bebé)" userInfo={dataBebe.birthbaby} changeUserInfo={changeBebe} id="birthbaby" icon="icon-[clarity--date-solid]" placeholder="Tu respuesta..." />

                            <Input name="Estatura del bebé" userInfo={dataBebe.babyheight} changeUserInfo={changeBebe} id="babyheight" icon="icon-[mdi--human-male-height]" placeholder="Centímetros (opcional)" />

                            <Input name="Peso del bebé" userInfo={dataBebe.babyweight} changeUserInfo={changeBebe} id="babyweight" icon="icon-[material-symbols--weight]" placeholder="Kilogramos (opcional)" />
                        </>
                    }
                    {tipo === "postparto" &&
                        <>
                            <Input name="Fecha último parto" userInfo={dataPostparto.lastbirthdate} changeUserInfo={changePostparto} id="lastbirthdate" icon="icon-[clarity--date-solid]" placeholder="Tu respuesta..." />

                            <Input name="Tipo de parto" userInfo={dataPostparto.birthtype} changeUserInfo={changePostparto} id="birthtype" icon="icon-[healthicons--pregnant]" placeholder="(simple / múltiple)" />

                            <Input name="He estado embarazada" userInfo={dataPostparto.pregnantbefore} changeUserInfo={changePostparto} id="pregnantbefore" icon="icon-[healthicons--pregnant]" placeholder="sí / no" />
                        </>
                    }
                    {question &&
                        (<div className="flex flex-col gap-2 w-full">
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
            </div>

            <div className="2xl:w-1/4 2xl:mt-8 mt-6 pagar__buton-container flex flex-col justify-center items-center w-full gap-4 text-gray-700">
                <h3 className="formulario__de__pago-h3 font-bold text-3xl text-start">Pago</h3>

                <div className="flex mt-4 flex-col gap-1 w-full lg:w-1/4 2xl:w-full items-center justify-center ">
                    <p>Vas a pagar un total de <b>${verificado ? 0 : precio}</b></p>
                    <p className="underline text-md">Elige tu método de pago: </p>

                    <b className="text-red-600">{messageError}</b>

                    {
                        //canjear codigo
                    }
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

                    {
                        (verificado && showSend)  && (
                            <SendCode setShowSend={setShowSend} question={question} code={cuppon} userInfo={userInfo} dataSend={tipo === "embarazo" ? dataEmbarazo : (tipo === "bebe" ? dataBebe : dataPostparto)} />
                        )
                    }

                    <Transbank tipo={tipo} setMessageError={setMessageError} precio={precio} title={title} dataSend={tipo === "embarazo" ? dataEmbarazo : (tipo === "bebe" ? dataBebe : dataPostparto)} userInfo={userInfo} question={question} />

                    <Checkout tipo={tipo} setMessageError={setMessageError} precio={precio} title={title} dataSend={tipo === "embarazo" ? dataEmbarazo : (tipo === "bebe" ? dataBebe : dataPostparto)} userInfo={userInfo} question={question} />

                </div>
            </div>
        </form>
    )
}

export default FormularioPago