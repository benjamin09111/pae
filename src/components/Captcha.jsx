import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({setCaptchaOK}) => {
  const start = Date.now();
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
    <div className="recaptcha">
    <ReCAPTCHA
        onChange={recaptchaChange}
        sitekey="6LcXtnApAAAAAM-OniROO8UbKM6jxkeSeI_dpIWq"
        onExpired={recaptchaExpired}
    />
</div>
  )
}

export default ReCaptcha