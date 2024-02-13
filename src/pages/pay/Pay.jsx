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

const Aviso = ({ texto }) => {
  return (
    <div className="aviso__texto">
      <p style={{ textAlign: "center" }}>{texto}</p>
    </div>
  )
}

const Pay = () => {
  //info del usuario que se repite en todas las consultas
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastname: "",
    age: "",
    email: "",
    type: "",
    sintoms: []
  })

  const agregarAutomaticaUsuario = (name, value) => {
    setUserInfo((prevData) => {
      const newData = { ...prevData };
      newData[name] = value;

      return newData;
    })
  }

  //actualiza la informacion de usuario dependiendo
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
    birthtype: "",
    momheight: "",
    momweight: "",
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
    namebaby: "",
    birthbaby: "",
    birthtype: "",
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

    console.log(dataBebe)
  };
  //info extra de tipo postparto
  const [dataPostparto, setDatapostparto] = useState({
    lastbirthdate: "",
    birthtype: "",
    babyheight: "",
    babyweight: "",
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

  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);

  //debe cambiarse, si ya está logeado y tiene token, poner true.
  const [logeado, setLogeado] = useState(false);
  //la variable logeado debe depender del token
  useEffect(() => {
    // Al cargar la página, verifica si hay un token en el localStorage
    const token = localStorage.getItem('miToken');

    console.log('Token en localStorage:', token);

    if (token) {
      // Aquí puedes realizar una llamada al servidor para validar el token si es necesario
      // Si el token es válido, establece logeado en true, de lo contrario, en false
      // En este ejemplo, simplemente establecemos logeado en true si hay un token
      setLogeado(true);
      console.log("Se ha modificado el logeado, tiene un token")
    }
  }, []); // El array vacío asegura que useEffect solo se ejecute una vez al cargar la página


  //mostrar o no contenedor de login
  const [login, setLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form1) {
      etapa1();
    } else if (form2) {
      etapa2();
    }
  };
  const closeLogin = () => {
    setLogin(false);
  }
  const etapa1 = (e) => {
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
  //NO FUNCIOA
  const etapa2 = (e) => {
      setForm2(false);
      setForm3(true);
  }
  const volveretapa2 = () => {
    setForm2(true);
    setForm3(false);
  }

  const [temaConsulta, setTemaConsulta] = useState("");
  const [message, setMessage] = useState("");
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  //abrir formulario, es necesario revisar el login antes
  const changeState1 = () => {
    setState1(!state1)

    if (logeado) {
      setState1(!state1)
    } else {
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

  const [invitado, setInvitado] = useState(false);

  const [registrarse, setRegistrarse] = useState(false);

  const openLogin = () => {
    setLogin(true);
    setRegistrarse(false);
  }

  const openRegister = () => {
    setLogin(false);
    setRegistrarse(true);
  }

  const [nickname, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('miToken');
    if (token) {
      setNickName(localStorage.getItem('username'));
      setLastname(localStorage.getItem('lastname'));
      setEmail(localStorage.getItem('email'));
    }
  }, [form1, form2, form3, login])

  return (
    <>
      <main className="px-12 pb-6">
        {(state1) && <FormularioPago login={login} registrarse={registrarse} agregarAutomaticaUsuario={agregarAutomaticaUsuario} userInfo={userInfo} changeUserInfo={handleChangeUser} precio="3" title="Pregunta para la consulta" question={true} state={state1} changeState={changeState1} logeado={logeado} tipo={temaConsulta} dataEmbarazo={dataEmbarazo} dataBebe={dataBebe} dataPostparto={dataPostparto} changeEmbarazo={handleChangeEmbarazo} changeBebe={handleChangeBebe} changePostparto={handleChangePostparto} setLogin={setLogin} estaLogeado={logeado} />}

        {(state2) && <FormularioPago agregarAutomaticaUsuario={agregarAutomaticaUsuario} userInfo={userInfo} changeUserInfo={handleChangeUser} precio="20" title="Teleconsulta" question={false} state={state2} changeState={changeState2} logeado={logeado} tipo={temaConsulta} dataEmbarazo={dataEmbarazo} dataBebe={dataBebe} dataPostparto={dataPostparto} changeEmbarazo={handleChangeEmbarazo} changeBebe={handleChangeBebe} changePostparto={handleChangePostparto} setLogin={setLogin} estaLogeado={logeado} />}

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
                  <button className="button-form" onClick={etapa1}>Siguiente</button>
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
                    <button className="button-form" onClick={etapa2}>Siguiente</button>
                    <button className="button-form" onClick={volveretapa1}>Volver</button>
                  </div>
                </div>
              )
            }
            {
              form3 && (
                <div className="flex flex-col gap-8 justify-center items-center">
                  {
                    nickname !== "" ?
                      (<div className="text-center text-profile shadow mt-2 p-4 rounded border-celeste text-gray-700 flex flex-col gap-2 lg:w-1/3">
                        <h5 className="text-xl  title">Información del perfil</h5>
                        <p className="text-left"><b>Nombre</b>: {nickname}</p>
                        <p className="text-left"><b>Apellido</b>: {lastname}</p>
                        <p className="text-left"><b>Email</b>: {email}</p>

                        <div className="lg:items-center">
                          <button className="lg:w-1/2 mt-4 rounded bg-celeste text-white" onClick={() => {
                            localStorage.removeItem('miToken');
                            window.location.reload();
                          }}>Click aquí para cerrar sesión</button>
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

                    <div className="flex flex-col w-64 gap-2 lg:border rounded lg:p-4">
                      <h3 className="title text-xl">Pregúntale al Doctor</h3>

                      <div className="flex gap-2">
                        <FaCheckCircle className=" text-blue-400" /> <p>Respuesta en menos de 3 horas</p>
                      </div>
                      <div className="flex gap-2">
                        <FaCheckCircle className=" text-blue-400" /> <p>Médicos especialistas</p>
                      </div>

                      <button className="bg-celeste p-2 text-white" onClick={changeState1} type="button">Quiero una pregunta</button>
                    </div>

                    <div className="flex flex-col w-64 gap-2 lg:border rounded lg:p-4">
                      <h3 className="title text-xl">Teleconsulta</h3>

                      <div className="flex gap-2">
                        <FaCheckCircle className=" text-blue-400" /> <p>Teleconsulta de 15 minutos</p>
                      </div>
                      <div className="flex gap-2">
                        <FaCheckCircle className=" text-blue-400" /> <p>Médicos especialistas</p>
                      </div>
                      <button className="bg-celeste p-2 text-white" onClick={changeState2} type="button">Quiero una teleconsulta</button>
                    </div>


                  </div>

                  <div className="w-full flex justify-center">
                    <button className="button-form" onClick={volveretapa2}>Volver</button>
                  </div>
                </div>)
            }

            {
              (login && !logeado && form3) && (
                <>
                  <Login state={login} changeState={closeLogin} setInvitado={setInvitado} setLogeado={setLogeado} openRegister={openRegister} />
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
