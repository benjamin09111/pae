import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({setCaptchaOK}) => {
  const recaptchaChange = (value) => {
    setCaptchaOK(value ? true : false);
  };

  return (
    <div className="recaptcha">
    <ReCAPTCHA
        onChange={recaptchaChange}
        sitekey="6LcXtnApAAAAAM-OniROO8UbKM6jxkeSeI_dpIWq"
    />
</div>
  )
}

export default ReCaptcha