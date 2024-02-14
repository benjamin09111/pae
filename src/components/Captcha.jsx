import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({setCaptchaOK}) => {
  
  const CaptchaKeys = {
    siteKey: "6LcXtnApAAAAAM-OniROO8UbKM6jxkeSeI_dpIWq",
    secretKey: "6LcXtnApAAAAACy05Mk3yjaUWslVu9WjdwY3UvlY"
    //remplazar por claves propias
  }
  const start = Date.now(); //para controlar el tiempo de expiración del captcha
  const recaptchaChange = (value) => {
    setCaptchaOK(value ? true : false);
  };

  const recaptchaExpired = () => {
    const end = Date.now();
    if (end - start < 60000) {
      setCaptchaOK(false);
      return;
    }
  }

  return (
    <div className="">
    <ReCAPTCHA
        onChange={recaptchaChange}
        sitekey= {CaptchaKeys.siteKey}
        onExpired={recaptchaExpired}
        hl="es-419"
    />
</div>
  )
}

export default ReCaptcha