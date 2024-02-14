import React from 'react'

const Input = ({name, changeUserInfo, userInfo, id, icon}) => {
    return (
        <div className="input__container text-xs lg:text-lg w-full 2xl:w-1/2">
            <div className="input-container w-full 2xl:w-1/2 flex gap-1 justify-start items-center pl-4">
                <span class={`${icon == "" ? "icon-[iconamoon--profile-fill]" : icon}`}></span>
                <label htmlFor={id}><b>{name}</b></label>
            </div>

            <input className='w-full' type="text" id={id} name={id} value={userInfo} onChange={changeUserInfo} required />
        </div>
    )
}

export default Input