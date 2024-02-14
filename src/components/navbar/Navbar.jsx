import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import logo1 from "../../assets/logo-1.png"
import Social from "../Social"
import './navbar.css';

const Navbar = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [nickname, setNickName] = useState("");
    useEffect(() => {
        const token = localStorage.getItem('miToken');
        if (token) {
            setNickName(localStorage.getItem('name'));
        }
    }, [])
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <nav className={`app__navbar px-6 ${visible ? '' : 'app__navbar--hidden'}`}>
            <div className='w-48'>
                <img src={logo1} alt='logo' />
            </div>
            <div className='hidden 2xl:flex justify-center items-center text-white gap-4 font-semibold'>
                <Link className='' to='/'>
                    Home
                </Link>
                <a href='#whatispae'>¿Qué es pregúntale al experto?</a>
                <Link className='' to='/begin'>
                    Consulta
                </Link>
                <a href='#pros'>Especialistas</a>
                <Link className='flex gap-1 justify-center items-center' to="/profile">
                    <span className="icon-[iconamoon--profile-fill] w-12 cursor-pointer text-white text-3xl hover:text-gray-200">
                    </span>
                    <p className='hover:text-gray-200'>Mi perfil</p>
                </Link>
            </div>
            <a target='_blank' className='hidden 2xl:flex rounded-2xl text-white hover:bg-pink-600 bg-pink-500 py-2 px-4' href='https://www.mimanualdelbebe.com'>Mi manual del bebé</a>
            {
                nickname && (
                    <div className="2xl:flex gap-1 justify-center items-center hidden">
                        <Link to="/profile">
                            <span className="icon-[iconamoon--profile-fill] w-12 cursor-pointer text-white text-3xl hover:text-gray-200"></span>
                        </Link>
                        <p className="text-md text-white">Logeado - <b>{nickname}</b></p>
                        <span onClick={() => {
                            localStorage.removeItem('miToken');
                            window.location.reload();
                        }} className="icon-[material-symbols--logout] cursor-pointer text-white text-3xl hover:text-gray-200"></span>
                    </div>
                )}
            <div className='hidden 2xl:flex'>
                <Social navbar={true} />
            </div>

            <div className='flex 2xl:hidden'>
                <GiHamburgerMenu
                    className='flex 2xl:hidden cursor-pointer'
                    color='#fff'
                    fontSize={27}
                    onClick={() => setToggleMenu(true)}
                />
                {toggleMenu && (
                    <div className='app__navbar-smallscreen_overlay slide-bottom'>
                        <div className='button-close-container'>
                            <button
                                className='app__navbar-button-exit'
                                style={{ border: 'none' }}
                                onClick={() => setToggleMenu(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <ul className='app__navbar-smallscreen-links'>
                            <Link onClick={() => setToggleMenu(false)} className='' to='/'>
                                Home
                            </Link>
                            <a href='#whatispae' onClick={() => setToggleMenu(false)}>¿Qué es pregúntale al experto?</a>
                            <Link className='' to='/begin'>
                                Consulta
                            </Link>
                            <a href='#pros' onClick={() => setToggleMenu(false)}>Especialistas</a>
                            <Link onClick={() => setToggleMenu(false)} className='flex gap-2 justify-center items-center' to="/profile">
                                <span className="icon-[iconamoon--profile-fill] text-white text-3xl">
                                </span>
                                <p>Mi perfil</p>
                            </Link>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
