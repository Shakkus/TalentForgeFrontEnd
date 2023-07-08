import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [showProgrammingLanguages, setShowProgrammingLanguages] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  const [courses, setCourses] = useState([])

  const [showResults, setShowResults] = useState(false); // BrowsedCoursesState

  const [searchTerm, setSearchTerm] = useState("")

  const [redirectCourse, setRedirectCourse] = useState(null)

  const [searchReults, setSearchReults] = useState([])

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
    const foundCourse = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    if (foundCourse) {
      setSearchReults(foundCourse)
    } else {
      setSearchReults([])
    }

    setShowResults(true); // Mostrar los resultados al hacer clic en el botón de búsqueda
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`https://talent-forge-data.cyclic.app/courses`)
        setCourses(data)
      } catch (error) {
        throw new Error(`Error fetching courses ${error}`)
      }
    }
    fetchData()
  }, [])


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
    <div className="all">
      <div className="container">
        <div className="Nav-left">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
          <div>
            <p className="bg-blue-300 font-bold text-red-600 ">
              Hola
            </p>
          </div>
          <div className="menu-container">
            <div className="menu-item" onClick={handleSubMenuToggle}>
              <h2 className="seacrchBar-CoursesTitle">Cursos</h2>
              {showSubMenu ? (
                <span className=""><img src="Arrow 12.png" alt="" /></span>
              ) : (
                <span className=""><img src="Arrow 13.png" alt="" /></span>
              )}
            </div>

            {showSubMenu && (
              <div className="submenu-container">
                <ul className="submenu">
                  <li
                    className="submenu-item"
                    onClick={handleProgrammingLanguagesToggle}
                  >
                    <p className="liProgramation">Lenguajes de Programación</p>
                    {showProgrammingLanguages ? (
                      <span className="arrow-right">&#9654;</span>
                    ) : (
                      <span className="arrow-right">&#x25c0;</span>
                    )}
                  </li>
                  <li className="submenu-item" onClick={handleLanguagesToggle}>
                    <p className="liLanguaje">Idiomas del Mundo</p>
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
                        to="/searchbar?search=python"
                        className="custom-link"
                      >
                        <li className="liProgramationOption">Python</li>
                      </Link>
                      <Link
                        to="/searchbar?search=Java"
                        className="custom-link"
                      >
                        <li className="liProgramationOption">Java</li>
                      </Link>
                      <Link
                        to="/searchbar?search=Javascript"
                        className="custom-link"
                      >
                        <li className="liProgramationOption">Javascript</li>
                      </Link>
                      <Link to="/searchbar?search=Go" className="custom-link">
                        <li className="liProgramationOption">Go</li>
                      </Link>
                    </ul>
                  </div>
                )}

                {showLanguages && (
                  <div className="submenu-right languages">
                    <ul className="language-container">
                      <Link
                        to="/searchbar?search=Inglés"
                        className="custom-link"
                      >
                        <li className="liLanguajeOption">Inglés</li>
                      </Link>
                      <Link
                        to="/searchbar?search=Alemán"
                        className="custom-link"
                      >
                        <li className="liLanguajeOption">Alemán</li>
                      </Link>
                      <Link
                        to="/searchbar?search=Español"
                        className="custom-link"
                      >
                        <li className="liLanguajeOption">Español</li>
                      </Link>
                      <Link
                        to="/searchbar?search=Italiano"
                        className="custom-link"
                      >
                        <li className="liLanguajeOption">Italiano</li>
                      </Link>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="Nav-center">
          <input type="text" placeholder="Buscar..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
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
      </div>


      {showResults && (
        <div>
          <h3>Resultados de Búsqueda:</h3>
          <div className="course-container">


            {searchReults.map(course => {
              return (
                <div key={course.id} className="course">
                  <img src={course.image} alt="Course Image" className="course-image" />
                  <h4 className="course-title">Title: {course.title}</h4>
                  <p className="course-category">category: {course.cathegory}</p>
                  <p className="course-teacher">Teacher: {course.teacher}</p>
                  <p className="course-duration">Duration: {course.duration}</p>
                  <p className="course-price">Price: {course.prize}</p>
                  <p className="course-rating">Rating: {course.rating}</p>
                </div>
              )
            })}
          </div>
        </div>


      )}

    </div>
  );
};

export default SearchBar;
