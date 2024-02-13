import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";

const FailCaptcha = () => {};


const ReCaptcha = () => {
  return (
    <div className="recaptcha">
    <ReCAPTCHA
        sitekey="6LcXtnApAAAAAM-OniROO8UbKM6jxkeSeI_dpIWq"
        onErrored={(e) => console.log(e)}
        onChange={(e) => console.log(e)}
    />
</div>
  )
}

export default ReCaptcha