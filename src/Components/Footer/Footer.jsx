import logo1 from "../LandingPage/imgs/logo1.jpg";
import "./Footer.css";
import whatsappImg from "./imgs/Vector-1.png";
import facebookImg from "./imgs/Vector-2.png";
import instagramImg from "./imgs/Vector-3.png";
import linkedinImg from "./imgs/Vector-4.png";
import ytImg from "./imgs/Vector.png";
import home from "./imgs/house-solid 1.png";
import phone from "./imgs/square-phone-solid 1.png";
import dot from "./imgs/location-dot-solid 1.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="contact">
        <div className="contact-contact p-3">
          <img className="contact-img" src={phone} alt="" />
          <h3 className="footerInfo">Contact</h3>
        </div>
        <div className="contact-info p-3">
          <img className="contact-img" src={home} alt="" />
          <h3 className="footerInfo">Home</h3>
        </div>
        <div className="contact-ubication p-3">
          <img className="contact-img" src={dot} alt="" />
          <h3 className="footerInfo">Ubication</h3>
        </div>
      </div>
      <div className="logo-redes">
        <img
          src="src/Components/LandingPage/imgs/opcion4.jpg"
          alt=""
          srcset=""
        />
        <div className="logo-redes">
          <img src={logo1} alt="" />
          <div className="redes">
            <img src={instagramImg} alt="" className="footerImg w-9" />
            <img src={facebookImg} alt="" className="footerImg w-9" />
            <img src={ytImg} alt="" className="footerImg w-9" />
            <img src={linkedinImg} alt="" className="footerImg w-9" />
            <img src={whatsappImg} alt="" className="footerImg w-9" />
          </div>
        </div>
      </div>
      <div className="about">
        <p className="aboutInfo">
        TALENT FORGE©. Educating since 2023{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
