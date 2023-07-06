import React, { useState } from "react";
import { useNavigate } from "react-router";

import "./LandingPage.css";
import logo1 from "./imgs/logo1.jpg";
import gb from './imgs/image 8.png'
import kr from './imgs/image 9.png'
import fr from './imgs/image 10.png'
import ita from './imgs/image 11.png'
import br from './imgs/image 12.png'
import ch from './imgs/image 13.png'
import sa from  './imgs/image 14.png'
import imgpres from "./imgs/_34feeb5f-5418-4f15-ae5b-a0e6f9cd7285-removebg-preview.png";
import empresas from "./imgs/empresas.jpg";

const Landing = () => {
  const [activeButton, setActiveButton] = useState("idiomas");
  const navigate = useNavigate();

  const renderContent = () => {
    if (activeButton === "idiomas") {
      return (
        <div className="flagsLanding">
        <img src={gb} alt="" /><br />
        <p className="flagsName">Inglés</p>
        <img src={kr} alt="" /><br /> 
        <p className="flagsName">Coreano</p>
        <img src={fr} alt="" /><br />
        <p className="flagsName">Francés</p>
        <img src={ita} alt="" /><br />
        <p className="flagsName">Italiano</p>
        <img src={br} alt="" /><br />
        <p className="flagsName">Portugés</p>
        <img src={ch} alt="" /><br />
        <p className="flagsName">Chino</p>
        <img src={sa} alt="" /><br />
        <p className="flagsName">Árabe</p>
      </div>
      );
    } else {
      return <div> ACA VAN LOS LENGUAJES DE PROGRAMACION</div>;
    }
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleRegister = () => {
    navigate('/register')
  }
  
  const handleLogin = () => {
    console.log('entra a login');
  }

  return (
    <div className="landing">
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
          <div className="info-container">
            <img src={empresas} alt="" />
            <div className="infoContainer">
              <h3>Buscas soluciones de idiomas para tu empresa?</h3>
              <h3 id="textoVioleta">Averigua como podemos ayudarte</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
