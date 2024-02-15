import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({ CaptchaRef }) => {
  return (
    <div className="recaptcha">
    <ReCAPTCHA
        sitekey="6LcXtnApAAAAAM-OniROO8UbKM6jxkeSeI_dpIWq"
        ref={CaptchaRef}
    />
</div>
  )
}

export default ReCaptcha