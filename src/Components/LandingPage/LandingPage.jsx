import React, { useState } from "react";
import { Link } from 'react-router-dom'

import "./LandingPage.css";
import CodeCourse from "./CodeCourses/CodeCourse";
import imgpres from "./imgs/_34feeb5f-5418-4f15-ae5b-a0e6f9cd7285-removebg-preview.png";
import empresas from "./imgs/empresas.jpg";
import LenCourse from "./LanguajeCourses/LenCourses";
import Teachers from "./Teachers/Teachers";

const Landing = () => {
  const [activeButton, setActiveButton] = useState("idiomas");

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

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
          <Link to='/register'>
            <button>Aprende gratis</button>
          </Link>
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
          <div className="containerCourses">
            {activeButton === 'idiomas' && <LenCourse/>}
            {activeButton === 'programacion' && <CodeCourse/>}
          </div>
        </div>
        <h2 id="titleMentors">Mentores</h2>
        <div className="mentoresContainer">
          {<Teachers/>}
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
