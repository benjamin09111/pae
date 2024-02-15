import { useState, useEffect } from "react"
import Footer from "../../components/Footer"
import images from "../../assets/sintoms"
import { FaCheckCircle } from "react-icons/fa"
import FormularioPago from "./FormularioPago"
import Login from "../../components/login/Login"
import Register from "../../components/register/Register"
import { SintomasMadre, SintomasBebe, SintomasPostparto } from './Sintomas'
import "./pay.css"
import "./paystyles.css"

const Pay = () => {
  //info del usuario que se repite en todas las consultas
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastname: "",
    age: "",
    email: "",
    type: "",
    country: "",
    sintoms: []
  })
  //funcion que agrega/actualiza al userInfo
  const agregarAutomaticaUsuario = (name, value) => {
    setUserInfo((prevData) => {
      const newData = { ...prevData };
      newData[name] = value;

      return newData;
    })
  }
  //actualiza la data según el tipo
  const handleChangeUser = (e) => {
    const { name, value, checked, type } = e.target;

    setUserInfo((prevData) => {
      const newData = { ...prevData };

      if (type === "radio") {
        newData[name] = value;
        setTemaConsulta(e.target.value);
      } else if (type === "checkbox") {
        if (checked) {
          newData[name] = [...newData[name], value];
        } else {
          newData[name] = newData[name].filter((sintoma) => sintoma !== value);
        }
      } else {
        newData[name] = value;
      }

      return newData;
    });
  };
  //info extra de tipo embarazo
  const [dataEmbarazo, setDataEmbarazo] = useState({
    birthmom: "",
    birthdate: "",
    weeks: "",
    birthtype: "",
    pregnantbefore: "",
    question: ""
  });
  const handleChangeEmbarazo = (e) => {
    const { name, value } = e.target;
    setDataEmbarazo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //info extra de tipo bebe
  const [dataBebe, setDataBebe] = useState({
    birthbaby: "",
    babyheight: "",
    babyweight: "",
    question: ""
  });
  const handleChangeBebe = (e) => {
    const { name, value } = e.target;

    setDataBebe((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //info extra de tipo postparto
  const [dataPostparto, setDatapostparto] = useState({
    lastbirthdate: "",
    birthtype: "",
    pregnantbefore: "",
    question: ""
  });
  const handleChangePostparto = (e) => {
    const { name, value } = e.target;
    setDatapostparto((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //formularios que se mostrarán según la etapa
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);
  //correccion de errores en los forms
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form1) {
      etapa1();
    } else if (form2) {
      etapa2();
    }
  };
  //mostrar o no contenedor de login
  const [login, setLogin] = useState(true);
  //abrir login
  const openLogin = () => {
    setLogin(true);
    setRegistrarse(false);
  }
  //cerrar login
  const closeLogin = () => {
    setLogin(false);
  }
  //cerrar sesión
  const closeSesion = () => {
    localStorage.removeItem('miToken');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('lastname');
    localStorage.removeItem('age');
    localStorage.removeItem('country');
    window.location.reload();
  }
  //mostrar o no contenedor de registro
  const [registrarse, setRegistrarse] = useState(false);
  const openRegister = () => {
    setLogin(false);
    setRegistrarse(true);
  }
  //darle clic al siguiente (etapa 1)
  const etapa1 = () => {
    if (userInfo["type"] !== "") {
      setForm1(false);
      setForm2(true);
    } else {
      setMessage("Debe seleccionar una opción");
    }
  }
  const volveretapa1 = () => {
    setForm1(true);
    setForm2(false);
  }
  //darle clic al siguiente (etapa 2)
  const etapa2 = () => {
    if (userInfo.sintoms.length > 0) {
      setForm2(false);
      setForm3(true);
    } else {
      setMessage("Debe seleccionar al menos un síntoma.");
    }
  }
  const volveretapa2 = () => {
    setForm2(true);
    setForm3(false);
  }

  const [temaConsulta, setTemaConsulta] = useState("");
  //mostrar mensaje por pantalla
  const [message, setMessage] = useState("");
  //qué formulario se abrirá, el de pregunta (1) o teleconsulta (2)
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  //abrir formulario 1 o 2, es necesario revisar el login antes
  const changeState1 = () => {
    setState1(!state1)
    if (!logeado) {
      setLogin(true)
    }
  };
  const changeState2 = () => {
    setState2(!state2);
    if (logeado) {
      setState2(!state2)
    } else {
      setLogin(true)
    }
  };

  //informacion de logeado
  const [user_id, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [logeado, setLogeado] = useState(false);
  //actualizar la informacion
  useEffect(() => {
    const token = localStorage.getItem('miToken');
    if (token) {
      setUserId(localStorage.getItem('user_id'))
      setEmail(localStorage.getItem('email'))
      setLogeado(true);
      //agregar informacion del logeado de manera automatica en setUserInfo
    }
  }, [login])

  return (
    <>
      <main className="px-12 pb-6">

        {(state1) && //formularios a la hora de realizar el pedido
          <FormularioPago
            title="Pregunta para la consulta"
            question={true} state={state1}
            precio="3"
            tipo={temaConsulta}
            userInfo={userInfo}
            changeUserInfo={handleChangeUser}
            dataEmbarazo={dataEmbarazo}
            dataBebe={dataBebe}
            dataPostparto={dataPostparto}
            changeEmbarazo={handleChangeEmbarazo}
            changeBebe={handleChangeBebe}
            changePostparto={handleChangePostparto}
            logeado={logeado}
            agregarAutomaticaUsuario={agregarAutomaticaUsuario}

            login={login}
            registrarse={registrarse}
            changeState={changeState1}
            setLogin={setLogin}
            estaLogeado={logeado}
          />}

        {(state2) &&
          <FormularioPago
            title="Teleconsulta"
            question={false}
            precio="20"
            tipo={temaConsulta}
            userInfo={userInfo}
            changeUserInfo={handleChangeUser}
            dataEmbarazo={dataEmbarazo}
            dataBebe={dataBebe}
            dataPostparto={dataPostparto}
            changeEmbarazo={handleChangeEmbarazo}
            changeBebe={handleChangeBebe}
            changePostparto={handleChangePostparto}
            logeado={logeado}
            agregarAutomaticaUsuario={agregarAutomaticaUsuario}

            state={state2}
            changeState={changeState2}
            setLogin={setLogin}
            estaLogeado={logeado}
          />}

        {
          ((!state1 && !state2) && <form className="pt-12" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center">
              <h5 className="title font-bold text-4xl text-center">Pregúntale al Experto</h5>
              <p className="text-gray-700 mt-2">Realiza tu teleconsulta rápidamente</p>
            </div>

            {form1 && (
              <div className="flex flex-col gap-4">
                <h2 className="title text-center text-2xl mt-4 underline">Escoge el tipo de consulta</h2>

                <div className="flex flex-col gap-4 lg:flex-row lg:justify-center lg:items-center">
                  <div className="form1__contenedor p-4 flex flex-col items-center justify-center gap-2">
                    <label className="text-md font-bold mb-2" htmlFor="opcion1">Embarazo</label>
                    <label htmlFor="opcion1" className="cursor-pointer flex flex-col items-center justify-center gap-2">
                      <img src={images.s1} alt="sintoma 1" />
                      <input
                        type="radio"
                        id="opcion1"
                        name="type"
                        value="embarazo"
                        checked={temaConsulta === "embarazo"}
                        onChange={handleChangeUser}
                      />
                    </label>
                  </div>

                  <div className="form1__contenedor p-4 flex flex-col items-center justify-center gap-2">
                    <label className="text-md font-bold mb-2" htmlFor="opcion2">Bebé</label>
                    <label htmlFor="opcion2" className="flex flex-col items-center justify-center gap-2 cursor-pointer">
                      <img src={images.s2} alt="sintoma 2" />
                      <input
                        type="radio"
                        id="opcion2"
                        name="type"
                        value="bebe"
                        checked={temaConsulta === "bebe"}
                        onChange={handleChangeUser}
                      />
                    </label>
                  </div>


                  <div className="form1__contenedor p-4 flex flex-col items-center justify-center gap-2">
                    <label className="text-md font-bold mb-2" htmlFor="opcion3">Mamá postparto</label>
                    <label htmlFor="opcion3" className="cursor-pointer flex flex-col items-center justify-center gap-2 ">
                      <img src={images.s3} alt="sintoma 3" />
                      <input
                        type="radio"
                        id="opcion3"
                        name="type"
                        value="postparto"
                        checked={temaConsulta === "postparto"}
                        onChange={handleChangeUser}
                      />
                    </label>
                  </div>

                </div>
                <p className="text-red-500 text-center">{message}</p>
                <div className="w-full flex justify-center">
                  <button className="button-form" onClick={()=>{
                    etapa1();
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth' // Esto hará que el scroll sea suave
                    });
                  }}>Siguiente</button>
                </div>
              </div>)
            }
            {
              form2 && (
                <div className="flex flex-col gap-4 justify-center items-center">
                  <h2 className="title text-center text-2xl mt-4 underline">¿Qué síntomas presentas?</h2>

                  {temaConsulta === "embarazo" && <SintomasMadre json={userInfo} changeState={handleChangeUser} />}
                  {temaConsulta === "bebe" && <SintomasBebe json={userInfo} changeState={handleChangeUser} />}
                  {temaConsulta === "postparto" && <SintomasPostparto json={userInfo} changeState={handleChangeUser} />}

                  <p className="text-red-500 text-center">{message}</p>
                  <div className="w-full flex gap-4 justify-center">
                    <button className="button-form" onClick={()=>{
                    etapa2();
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth' // Esto hará que el scroll sea suave
                    });
                  }}>Siguiente</button>
                    <button className="button-form" onClick={()=>{
                    volveretapa1();
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth' // Esto hará que el scroll sea suave
                    });
                  }}>Volver</button>
                  </div>
                </div>
              )
            }
            {
              form3 && (
                <div className="flex flex-col gap-8 justify-center items-center">
                  {
                    user_id !== "" ?
                      (<div className="text-center text-profile shadow mt-2 p-4 rounded border-celeste text-gray-700 flex flex-col gap-2 lg:w-1/3">
                        <h5 className="text-xl text-center  title">Logeado</h5>
                        <p className="text-center"><b>Email</b>: {email}</p>

                        <div className="lg:items-center">
                          <button className="lg:w-1/2 p-2 mt-4 rounded w-full  bg-celeste text-white" onClick={() => closeSesion()}>Click aquí para cerrar sesión</button>
                        </div>
                      </div>) :
                      (<div className="text-center mt-2">
                        <button className="mt-4 py-1 px-4 rounded bg-celeste text-white" onClick={() => { setLogin(true); }
                        }>Iniciar sesión
                        </button>
                      </div>)
                  }

                  <h2 className="title text-center text-2xl mt-4 underline">Tipo de servicio</h2>
                  <p className="text-gray-600 text-center">Selecciona el tipo de servicio que más se acomode a ti</p>

                  <div className="flex flex-col gap-8 justify-center items-center lg:flex-row lg:items-start lg:gap-20">

                    <div className="flex flex-col justify-between w-64 gap-2 lg:border rounded min-h-64 lg:p-4">
                      <h3 className="title text-xl">Pregúntale al Doctor</h3>

                      <div className="flex gap-2">
                        <FaCheckCircle className=" text-blue-400" /> <p>Respuesta en menos de 3 horas</p>
                      </div>
                      <div className="flex gap-2">
                        <FaCheckCircle className=" text-blue-400" /> <p>Médicos especialistas</p>
                      </div>

                      <button className="bg-celeste p-2 text-white" onClick={()=>{
                        changeState1();
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth' // Esto hará que el scroll sea suave
                        });
                      }} type="button">Quiero una pregunta</button>
                    </div>

                    <div className="flex flex-col justify-between w-64 gap-2 lg:border rounded min-h-64 lg:p-4">
                      <h3 className="title text-xl">Teleconsulta</h3>

                      <div className="flex gap-2">
                        <FaCheckCircle className=" text-blue-400" /> <p>Teleconsulta de 15 minutos</p>
                      </div>
                      <div className="flex gap-2">
                        <FaCheckCircle className=" text-blue-400" /> <p>Médicos especialistas</p>
                      </div>
                      <button className="bg-celeste p-2 text-white" onClick={()=>{
                        changeState2();
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth' // Esto hará que el scroll sea suave
                        });
                      }} type="button">Quiero una teleconsulta</button>
                    </div>


                  </div>

                  <div className="w-full flex justify-center">
                    <button className="button-form" onClick={()=>{
                    volveretapa2();
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth' // Esto hará que el scroll sea suave
                    });
                  }}>Volver</button>
                  </div>
                </div>)
            }

            {
              (login && !logeado && form3) && (
                <>
                  <Login userInfo={userInfo} state={login} changeState={closeLogin} setLogeado={setLogeado} openRegister={openRegister} />
                  <div className="begin__main-overlay"></div>
                </>
              )
            }
            {
              registrarse && (
                <>
                  <Register state={registrarse} openLogin={openLogin} changeLogin={setLogin} setRegistrarse={setRegistrarse} />
                  <div className="begin__main-overlay"></div>
                </>
              )
            }
          </form>)
        }

        <script type="text/javascript" src="https://checkout.epayco.co/checkout.js" />
      </main>
      <Footer estilo="footer-down lg:mt-36" />
    </>
  );
};

export default Pay;
