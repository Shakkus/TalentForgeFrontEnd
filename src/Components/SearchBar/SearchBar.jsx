import React, { useState, useEffect } from "react";
import logo from "../../Recourses/CarpinchoLogo.png";
import hearth from "../../Recourses/hearth.png";
import shopcar from "../../Recourses/shop-car.png";
import social from "../../Recourses/social.png";
import searchIcon from "../../Recourses/searchIcon.png";
import profile from "../../Recourses/profile.png";
import "./SearchBar.css";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //    CursosStates
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showProgrammingLanguages, setShowProgrammingLanguages] =
    useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  const [showResults, setShowResults] = useState(false); // BrowsedCoursesState

  const handleSubMenuToggle = () => {
    // CursosStates
    setShowSubMenu(!showSubMenu);
  };

  const handleProgrammingLanguagesToggle = () => {
    //CursosStates submenu
    setShowProgrammingLanguages(!showProgrammingLanguages);
    setShowLanguages(false);
  };

  const handleLanguagesToggle = () => {
    //CursosStates submenu
    setShowLanguages(!showLanguages);
    setShowProgrammingLanguages(false);
  };

  const handleSearch = () => {
    setShowResults(true); // Mostrar los resultados al hacer clic en el botón de búsqueda
  };

  // useEffect(() => {
  //   // Lógica para comprobar el estado de inicio de sesión aquí
  //   // Por ejemplo, puedes llamar a una API para verificar si el usuario está autenticado
  //   // y luego actualizar el estado en consecuencia

  //   // Ejemplo: Simulación de inicio de sesión exitoso después de 2 segundos
  //   setTimeout(() => {
  //     setIsLoggedIn(true);
  //   }, 10000);
  // }, []);

  return (
    <divPrincipal className="all">
      <container className="container">
        <div className="Nav-left">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
          <div className="menu-container">
            <div className="menu-item" onClick={handleSubMenuToggle}>
              Cursos
              {showSubMenu ? (
                <span className="arrow">&#9650;</span>
              ) : (
                <span className="arrow">&#9660;</span>
              )}
            </div>

            {showSubMenu && (
              <div className="submenu-container">
                <ul className="submenu">
                  <li
                    className="submenu-item"
                    onClick={handleProgrammingLanguagesToggle}
                  >
                    Lenguajes de Programación
                    {showProgrammingLanguages ? (
                      <span className="arrow-right">&#9654;</span>
                    ) : (
                      <span className="arrow-right">&#x25c0;</span>
                    )}
                  </li>
                  <li className="submenu-item" onClick={handleLanguagesToggle}>
                    Idiomas del Mundo
                    {showLanguages ? (
                      <span className="arrow-right">&#9654;</span>
                    ) : (
                      <span className="arrow-right">&#x25c0;</span>
                    )}
                  </li>
                </ul>

                {showProgrammingLanguages && (
                  <div className="submenu-right programming-languages">
                    <ul className="language-container">
                      <Link
                        to="/searchbar?shearch=python"
                        className="custom-link"
                      >
                        <li>Python</li>
                      </Link>
                      <Link
                        to="/searchbar?shearch=Java"
                        className="custom-link"
                      >
                        <li>Java</li>
                      </Link>
                      <Link
                        to="/searchbar?shearch=Javascript"
                        className="custom-link"
                      >
                        <li>Javascript</li>
                      </Link>
                      <Link to="/searchbar?shearch=Go" className="custom-link">
                        <li>Go</li>
                      </Link>
                    </ul>
                  </div>
                )}

                {showLanguages && (
                  <div className="submenu-right languages">
                    <ul className="language-container">
                      <Link
                        to="/searchbar?shearch=Inglés"
                        className="custom-link"
                      >
                        <li>Inglés</li>
                      </Link>
                      <Link
                        to="/searchbar?shearch=Alemán"
                        className="custom-link"
                      >
                        <li>Alemán</li>
                      </Link>
                      <Link
                        to="/searchbar?shearch=Español"
                        className="custom-link"
                      >
                        <li>Español</li>
                      </Link>
                      <Link
                        to="/searchbar?shearch=Italiano"
                        className="custom-link"
                      >
                        <li>Italiano</li>
                      </Link>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="Nav-center">
          <input type="text" placeholder="Buscar..." />
          <Link to="search">
            <img
              className="search-icon"
              src={searchIcon}
              alt="search"
              onClick={handleSearch}
            />
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="Nav-right">
            <div className="nav-dropdown">
              <p className="inventory">
                <Link to="/inventory" className="custom-link">
                  Mis cursos
                </Link>
              </p>
            </div>
            <Link to="/wishlist" className="custom-link">
              <img className="hearth" src={hearth} alt="hearth" />
            </Link>
            <Link to="/shopcar" className="custom-link">
              <img className="shopcar" src={shopcar} alt="shopcar" />
            </Link>
            <Link to="/social" className="custom-link">
              <img className="social" src={social} alt="social" />
            </Link>
            <Link to="/profile/:id" className="custom-link">
              <img className="profile-img" src={profile} alt="profile" />
            </Link>
          </div>
        ) : (
          <div className="buttons">
            <Link to="/register">
              <button className="register">Registrarse</button>
            </Link>
            <Link to="/login">
              <button className="login">Entrar</button>
            </Link>
          </div>
        )}
      </container>
    </divPrincipal>
  );
};

export default SearchBar;
