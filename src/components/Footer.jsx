import img1 from "../assets/ac1.png";
import img2 from "../assets/ac2.png";
import img3 from "../assets/ac3.png";
import logo1 from "../assets/logo-1.png";
import logo2 from "../assets/logo-2.png";
import Social from "./Social.jsx";
import "./footer.css"

const Footer = ({estilo=""}) => {
  return (
    <footer className={`footer__color gap-4 lg:gap-0 flex-wrap flex py-12 flex-col items-center justify-center ${estilo}`} id='footer'>
      <div className='flex w-full justify-center items-center'>
        <div className='h-1 hidden 2xl:block w-1/3 bg-neutral-900'></div>
        <div className='flex 2xl:w-1/3 flex-wrap md:flex-nowrap 2xl:justify-between items-center justify-center'>
          <img className='w-64' src={img1} alt="image-1" />
          <img className='w-32' src={img2} alt="image-2" />
          <img className='w-32' src={img3} alt="image-3" />
        </div>
        <div className='h-1 hidden 2xl:block w-1/3 bg-neutral-900'></div>
      </div>

      <div className='flex w-full flex-col gap-8 lg:gap-0 lg:flex-row items-center px-12'>
        <div className="lg:w-1/3">
          <img src={logo2} alt="image" />
        </div>
        <div className='content flex gap-3 lg:gap-0 flex-col justify-center lg:items-center items-start lg:w-1/3'>
          <p>Información confiable para mujeres gestantes y con niños en edad pediátrica</p>
          <p><b>Contacto:</b> contáctanos @mimanualdelbebe.com</p>
          <a target="_blank" className="hover:underline" href="https://mimanualdelbebe.com/terminos-y-condiciones/">Términos y condiciones</a>
          <a target="_blank" className="hover:underline" href="https://mimanualdelbebe.com/quienes-somos/">Sobre nosotros</a>
          <p>© Alola Connection Ltda. 2021</p>
          <p>© Freepik images</p>
        </div>
        <div className='flex flex-wrap flex-col items-center justify-center gap-2 lg:w-1/3'>
          <div><img src={logo1} alt="image" /></div>
          <div>
            <p className='text-center text-xl'>Síguenos</p>
            <Social navbar={false} />
          </div>
        </div>
      </div>
      
    </footer>
  )
}

export default Footer