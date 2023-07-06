import logo1 from "../LandingPage/imgs/logo1.jpg"
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer">
      <div className="contact-home">
        <h3>Contact</h3>
        <h3>Home</h3>
        <h3>Ubication</h3>
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
            <h3>
              <a href="#">Instagram</a>
            </h3>
            <h3>
              <a href="#">Facebook</a>
            </h3>
            <h3>
              <a href="#">YouTube</a>
            </h3>
            <h3>
              <a href="#">Linkedin</a>
            </h3>
            <h3>
              <a href="#">Whatsapp</a>
            </h3>
          </div>
        </div>
      </div>
      <div className="about">
        <h3>About Us</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum
          eligendi illo, ducimus accusantium quidem{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
