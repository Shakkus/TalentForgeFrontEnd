import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../Recourses/CarpinchoLogo.png";
import hearth from "../../Recourses/hearth.png";
import shopcar from "../../Recourses/shop-car.png";
import social from "../../Recourses/social.png";
import searchIcon from "../../Recourses/searchIcon.png";
import profile from "../../Recourses/profile.png";
import "./SearchBar.css";

const SearchBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // CursosStates
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showProgrammingLanguages, setShowProgrammingLanguages] = useState(
    false
  );
  const [showLanguages, setShowLanguages] = useState(false);

  const [courses, setCourses] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [redirectCourse, setRedirectCourse] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleSubMenuToggle = () => {
    setShowSubMenu(!showSubMenu);
  };

  const handleProgrammingLanguagesToggle = () => {
    setShowProgrammingLanguages(!showProgrammingLanguages);
    setShowLanguages(false);
  };

  const handleLanguagesToggle = () => {
    setShowLanguages(!showLanguages);
    setShowProgrammingLanguages(false);
  };

  const handleSearch = () => {
    const foundCourse = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundCourse.length > 0) {
      setSearchResults(foundCourse);
    } else {
      setSearchResults([]);
    }

    setShowResults(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://talent-forge-data.cyclic.app/courses"
        );
        setCourses(data);
      } catch (error) {
        throw new Error(`Error fetching courses ${error}`);
      }
    };
    fetchData();
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/search") {
      setShowResults(false);
      setSearchResults([]);
    }
  }, [location]);


  return (
    <nav className="all">
      <div className="nav">
        <div className="Nav-left">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
          <div className="menu-container">
            <div className="menu-item" onClick={handleSubMenuToggle}>
              <h2 className="seacrchBar-CoursesTitle">Courses</h2>
              {showSubMenu ? (
                <span className=""><div className="triangle-up"></div></span>
              ) : (
                <span className=""><div className="triangle-down"></div></span>
              )}
            </div>

             {showSubMenu && (
              <div className="submenu-container">
                <ul className="submenu">

                  <li className="submenu-item" onClick={handleLanguagesToggle}> <NavLink to='/course/create'> Create your Course </NavLink> </li>

                  <li className="submenu-item" onClick={handleLanguagesToggle}> <NavLink to='/home'> Home </NavLink> </li>

                  {/* <li
                    className="submenu-item"
                    onClick={handleProgrammingLanguagesToggle}
                  >
                    <p className="liProgramation">Programming</p>
                    {showProgrammingLanguages ? (
                      <span className="arrow-right">&#9654;</span>
                    ) : (
                      <span className="arrow-right">&#x25c0;</span>
                    )}
                  </li>
                  <li className="submenu-item" onClick={handleLanguagesToggle}>
                    <p className="liLanguaje">Languages</p>
                    {showLanguages ? (
                      <span className="arrow-right">&#9654;</span>
                    ) : (
                      <span className="arrow-right">&#x25c0;</span>
                    )}
                  </li> */}

                </ul>

                {/* {showProgrammingLanguages && (
                  <div className="submenu-right programming-languages">
                    <ul className="language-container">
                      <Link
                        to="/course/64a829f5435d4fe72524052b"
                        className="custom-link"
                      >
                        <li className="liProgramationOption">Python</li>
                      </Link>
                      <Link
                        to="/course/64a829ef435d4fe725240529"
                        className="custom-link"
                      >
                        <li className="liProgramationOption">NodeJS</li>
                      </Link>
                      <Link
                        to="/searchbar?search=Javascript"
                        className="custom-link"
                      >
                        <li className="liProgramationOption">Javascript</li>
                      </Link>
                      <Link to="course/64a82a01435d4fe72524052d" className="custom-link">
                        <li className="liProgramationOption">ReactJS</li>
                      </Link>
                      <Link to="/course/64a82a07435d4fe72524052f" className="custom-link">
                        <li className="liProgramationOption">TypeScript</li>
                      </Link>
                    </ul>
                  </div>
                )} */}

                {/* {showLanguages && (
                  <div className="submenu-right languages">
                    <ul className="language-container">
                      <Link
                        to="course/64a829e5435d4fe725240525"
                        className="custom-link"
                      >
                        <li className="liLanguajeOption">Inglés</li>
                      </Link>
                      <Link
                        to="/course/64a829cf435d4fe72524051f"
                        className="custom-link"
                      >
                        <li className="liLanguajeOption">Alemán</li>
                      </Link>
                      <Link
                        to="/course/64a829df435d4fe725240523"
                        className="custom-link"
                      >
                        <li className="liLanguajeOption">Italiano</li>
                      </Link>
                      <Link
                        to="/course/64a829ea435d4fe725240527"
                        className="custom-link"
                      >
                        <li className="liLanguajeOption">Coreano</li>
                      </Link>
                      <Link
                        to="/course/64a829d9435d4fe725240521"
                        className="custom-link"
                      >
                        <li className="liLanguajeOption">Japonés</li>
                      </Link>
                    </ul>
                  </div>
                )} */}
              </div>
            )} 
          </div>
        </div>
        <div className="searchbar-container">
          <input type="text" placeholder="Buscar..." value={searchTerm}  onChange={(event) => setSearchTerm(event.target.value)} className="searchbar-class" />
          <div className="busqueda-box"> <Link to="search"> <img className="busqueda" src={searchIcon} alt="search" onClick={handleSearch} /> </Link></div>
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
              <button className="register">Register</button>
            </Link>
            <Link to="/login">
              <button className="login">Log In</button>
            </Link>
          </div>
        )}
      </div>


      {showResults && (
        <div search-mapper>
          <h3>Search...</h3>
          <div className="course-container">
            {searchResults.map(course => {
              return (
                <div key={course.id} className="course">
                  <img src={course.image} alt="Course Image" className="course-form-image" />

                  <div className="course-presentation">
                    <div className="course-form-title-box">
                      <NavLink to={`/course/${course._id}`}><h4 className="course-form-title">{course.title}</h4></NavLink>
                    </div>

                    <div className="course-form-teacher-box">
                      <p className="course-form-teacher">{course.teacher}</p>
                    </div>
                  </div>

                  <div className="course-box">
                    <div className="course-form-info-box">
                      <div className="label">
                        <h6 className="label-text"> category </h6>
                        <p className="course-form-category"> {course.cathegory}</p> 
                      </div>

                      <div className="label">
                        <h6 className="label-text"> duration </h6>
                        <p className="course-form-duration"> {course.duration}</p> 
                      </div>

                      <div className="label">
                        <h6 className="label-text"> price </h6>
                        <p className="course-form-price">{course.prize}</p> 
                      </div>

                      <div className="label">
                        <h6 className="label-text"> rating </h6>
                        <p className="course-form-rating">{course.rating}</p> 
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>


      )}

    </nav>
  );
};

export default SearchBar;
