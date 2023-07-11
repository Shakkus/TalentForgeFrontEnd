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

const SearchBar = ({ setSearchResults }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showProgrammingLanguages, setShowProgrammingLanguages] = useState(
    false
  );
  const [showLanguages, setShowLanguages] = useState(false);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    setSearchResults(foundCourse);
    setSearchTerm("")
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
      setSearchTerm("");
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
                <span className="">
                  <div className="triangle-up"></div>
                </span>
              ) : (
                <span className="">
                  <div className="triangle-down"></div>
                </span>
              )}
            </div>

            {showSubMenu && (
              <div className="submenu-container">
                <ul className="submenu">
                  <li className="submenu-item" onClick={handleLanguagesToggle}>
                    <NavLink to="/course/create">Create your Course</NavLink>
                  </li>
                  <li className="submenu-item" onClick={handleLanguagesToggle}>
                    <NavLink to="/home">Home</NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="searchbar-container">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="searchbar-class"
          />
          <div className="busqueda-box">
            <Link to="search">
              <img
                className="busqueda"
                src={searchIcon}
                alt="search"
                onClick={handleSearch}
              />
            </Link>
          </div>
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
    </nav>
  );
};

export default SearchBar;
