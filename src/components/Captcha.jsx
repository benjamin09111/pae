import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";



const ReCaptcha = ({myCaptchaRef}) => {
  return (
    <div className="recaptcha">
    <ReCAPTCHA
        sitekey="6LcXtnApAAAAAM-OniROO8UbKM6jxkeSeI_dpIWq"
        onErrored={(e) => console.log(e)}
        onChange={(e) => console.log(e)}
        ref={myCaptchaRef}
    />
</div>
  )
}

export default ReCaptcha