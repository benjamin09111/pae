import { useState } from "react";
import Navbar from "../components/navbar/Navbar"
import Header from "../containers/header/Header"
import Main from "../containers/main/Main"
import "../components/login/login.css"
import "./style.css"

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className='home__container'>
      <Navbar changeLogin={setShowLogin} changeRegister={setShowRegister} />
      <Header/>
      <Main/>
    </div>
  )
}

export default Home