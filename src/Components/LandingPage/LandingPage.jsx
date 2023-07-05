import React, { useState } from "react";

import "./style.css";
import logo1 from "./imgs/logo1.jpg";
import imgpres from "./imgs/_34feeb5f-5418-4f15-ae5b-a0e6f9cd7285-removebg-preview.png";
import empresas from "./imgs/empresas.jpg";

const Landing = () => {
  const [activeButton, setActiveButton] = useState("idiomas");

  const renderContent = () => {
    if (activeButton === "idiomas") {
      return <div> ACA VAN LOS IDIOMAS</div>;
    } else {
      return <div> ACA VAN LOS LENGUAJES DE PROGRAMACION</div>;
    }
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className="landing">
      <h2>Esto son pruebas unicamente</h2>
      <div className="header">
        <img src={logo1} alt="" />
        <div className="buttons">
          <button id="register">Registrarse</button>
          <button id="login">Entrar</button>
        </div>
      </div>

      <div className="presentation">
        <div className="presentationContainer">
          <h3>Habla un idioma en tan solo 10 minutos al dia!</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta esse
            amet modi. Dignissimos, beatae autem quisquam nobis esse vel atque
            maxime sapiente sequi eum earum veniam architecto iure quaerat
            repellat!
          </p>
          <button id="aprende-Gratis">Aprende Gratis</button>
        </div>
        <img src={imgpres} alt="" />
      </div>

      <div className="whiteBack">
        <div className="selector">
          <h2>Quiero Aprender</h2>
          <div className="botones">
            <button
              id="idiomas"
              className={activeButton === "idiomas" ? "active" : ""}
              onClick={() => handleButtonClick("idiomas")}
            >
              Idiomas
            </button>

            <button
              id="programacion"
              className={activeButton === "programacion" ? "active" : ""}
              onClick={() => handleButtonClick("programacion")}
            >
              Programacion
            </button>
          </div>

          {renderContent() /*ESTO DEBERIA RENDERIZAR CIERTO CONTENIDO */}
        </div>
        <div className="mentores">
          <h2>Mentores</h2>
          {/* COMPONENTE DE RENDERIZADO DE PROFESORES */}
        </div>

        <div className="empresas">
          <h2>Talent Forge para empresas</h2>
          <div className="container">
            <img src={empresas} alt="" />
            <div className="infoContainer">
              <h3>Buscas soluciones de idiomas para tu empresa?</h3>
              <h3 id="textoVioleta">Averigua como podemos ayudarte</h3>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default Landing;
