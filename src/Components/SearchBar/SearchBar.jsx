import React, { useState, useEffect, useContext } from "react";
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
  const [showLanguages, setShowLanguages] = useState(false);

  const [courses, setCourses] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [redirectCourse, setRedirectCourse] = useState(null);

  const [isCartOpen, setCartOpen] = useState(false);

  const handleSubMenuToggle = () => {
    setShowSubMenu(!showSubMenu);
  };

  const handleLanguagesToggle = () => {
    setShowLanguages(!showLanguages);
    setShowSubMenu(false);
  };

  const handleSearch = () => {
    const foundCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundCourses.length > 0) {
      setSearchResults(foundCourses);
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

  const [cartCourses, setCartCourses] = useState([]);

  const deleteFromCart = (course) => {
    const updatedCartCourses = cartCourses.filter(
      (item) => item.id !== course.id
    );

    localStorage.setItem("cartCourses", JSON.stringify(updatedCartCourses));
    console.log("Se eliminó el curso");
  };

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
                <span className=""><div className="triangle-up"></div></span>
              ) : (
                <span className=""><div className="triangle-down"></div></span>
              )}
            </div>

            {showSubMenu && (
              <div className="submenu-container">
                <ul className="submenu">
                  <li className="submenu-item">
                    <NavLink to="/course/create">Create your Course</NavLink>
                  </li>
                  <li className="submenu-item">
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
            <button
              className="cart"
              id="cart"
              onClick={() => setCartOpen(!isCartOpen)}
            >
              Carrito
            </button>
            {isCartOpen && (
              <div id="cartMenu" className="cart-menu">
                {cartCourses.map((course, index) => (
                  <div key={index} className="courseOnCart">
                    <p>{course.title}</p>
                    <p>{course.prize}</p>
                    <button onClick={() => deleteFromCart(course)}>X</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default SearchBar;
