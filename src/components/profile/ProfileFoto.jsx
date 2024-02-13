import fotoPerfilNula from "../../assets/nofoto.webp"

const ProfileFoto = ({ imagen = "", name}) => {
    const longitud = name.length;
    return (
        <div className='flex flex-col w-full items-center justify-center mb-6'>
            <div className=" w-32">
                <img src={imagen === "" ? fotoPerfilNula : imagen} alt="foto de perfil" />
            </div>
            <div className=" overflow-hidden w-full text-center text-md font-semibold">
                {name.slice(0,20) + `${longitud > 20? "..." : ""}`}
            </div>
        </div>
    )
}

export default ProfileFoto