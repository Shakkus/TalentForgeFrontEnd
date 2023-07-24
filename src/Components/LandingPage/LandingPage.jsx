import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css";
import CodeCourse from "./CodeCourses/CodeCourse";
import imgpres from "./imgs/_34feeb5f-5418-4f15-ae5b-a0e6f9cd7285-removebg-preview.png";
import empresas from "./imgs/empresas.jpg";
import LenCourse from "./LanguajeCourses/LenCourses";
import Teachers from "./Teachers/Teachers";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Landing = () => {
  const [activeButton, setActiveButton] = useState("idiomas");
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className="landing">
      <div className="presentation block w-full lg:flex mt-0">
        <div className="w-72 max-sm:w-80 ">
          <img src={imgpres} alt="" className="mx-0 my-auto" />
        </div>
        <div className="presentationContainer w-full sm:w-2/6 flex-col max-lg:w-80">
          <h3 className="presentation-title sm:text-2xl text-xl mb-3">
            Speak a language in just 10 minutes per day!
          </h3>
          <p>
            With our expertly certified language courses, by investing just a
            fraction of your day you can speak any language to perfection in as
            little as 6 months! Available at any time and schedule for your
            convenience. Talent forge adapts to you and builds your knowledge.
          </p>
          <Link to="/register">
            <button>Learn!</button>
          </Link>
        </div>
      </div>

      <div className="whiteBack">
        <div className="selector">
          <h2 className="sm:text-3xl text-lg my-6">
            Courses just a click away!
          </h2>
          <div className="botones">
            <button
              id="idiomas"
              className={activeButton === "idiomas" ? "active" : ""}
              onClick={() => handleButtonClick("idiomas")}>
              Lenguages
            </button>

            <button
              id="programacion"
              className={activeButton === "programacion" ? "active" : ""}
              onClick={() => handleButtonClick("programacion")}>
              Programming
            </button>
          </div>
          <div className="containerCourses">
            {activeButton === "idiomas" && <LenCourse />}
            {activeButton === "programacion" && <CodeCourse />}
          </div>
        </div>
        <h2 id="titleMentors" className="text-white text-2xl">
          Mentors
        </h2>
        <div className="mentoresContainer">{<Teachers />}</div>

        <div className="empresas">
          <h2 className="text-white text-2xl">Talent Forge for companies</h2>
          <div className="info-container block sm:flex items-center justify-center my-20">
            <img
              src={empresas}
              alt=""
              className="rounded-tl-3xl rounded-br-3xl my-0 mx-auto"
            />
            <div className="infoContainer">
              <h3 className="sm:text-2xl text-lg">
                Looking for language solutions for your company?
              </h3>
              <h3 id="textoVioleta" className="sm:text-2xl text-lg">
                We can help you
              </h3>
              <Link to="companyContact" className="m-3 w-2">
                <h1 className="relative text-white bg-purple-500 p-3 w-40 mt-0 mx-auto rounded-xl mb-0 customHoverShadow">
                  Contact Us
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
