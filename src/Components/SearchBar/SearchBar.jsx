import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../Recourses/CarpinchoLogo.png";
import hearth from "../../Recourses/hearth.png";
import shopcar from "../../Recourses/shopcar-car.png";
import social from "../../Recourses/social.png";
import searchIcon from "../../Recourses/searchIcon.png";
import profile from "../../Recourses/profile.png";
import { useAuth } from "../../context/authContext.js";
import homeIcon from "../../Recourses/homeIcon.png";
// import menuIcon from "../../Recourses/menuIcon.png"

import "./SearchBar.css";

const SearchBar = ({ setSearchResults }) => {
  const { user, logOut } = useAuth();

  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const foundCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundCourses.length > 0) {
      setSearchResults(foundCourses);
    } else {
      setSearchResults([]);
    }
  };

  const handleLogout = () => {
    logOut();
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
    const coursesInCart = localStorage.getItem("cartCourses");
    if (coursesInCart) {
      const parsedCourses = JSON.parse(coursesInCart);
      setCartCount(parsedCourses.length);
    } else {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== "/search") {
      setSearchTerm("");
    }
  }, [location]);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleProfileMenuToggle = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav className="bg-[#7c38cd]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/">
              <img className="h-8" src={logo} alt="logo" />
            </Link>
            <Link to="/home" className="ml-4">
              <img
                className="h-6 filter-invert"
                id="icon"
                src={homeIcon}
                alt="home"
              />
            </Link>
            <div className="ml-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="bg-white text-black rounded-md pl-10 pr-4 py-2"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Link to="search">
                    <img
                      className="h-4 text-gray-500 filter-invert"
                      src={searchIcon}
                      alt="search"
                      onClick={handleSearch}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <>
                <Link
                  to="/wishlist"
                  className="text-white hover:text-gray-300 ml-6"
                >
                  <img
                    className="h-6 filter-invert"
                    id="icon"
                    src={hearth}
                    alt="hearth"
                  />
                </Link>
                <Link
                  to="/cart"
                  className="text-white hover:text-gray-300 ml-6 relative"
                >
                  <div className="flex items-center">
                    <img
                      className="h-6 filter-invert"
                      id="icon"
                      src={shopcar}
                      alt="shopcar"
                    />
                    {cartCount > 0 && (
                      <div className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1">
                        {cartCount}
                      </div>
                    )}
                  </div>
                </Link>
                <Link
                  to="/social"
                  className="text-white hover:text-gray-300 ml-6"
                >
                  <img
                    className="h-6 filter-invert"
                    id="icon"
                    src={social}
                    alt="social"
                  />
                </Link>
                <div className="relative">
                  <img
                    className="h-6 filter-invert cursor-pointer"
                    src={profile}
                    alt="profile"
                    onClick={handleProfileMenuToggle}
                  />
                  {showProfileMenu && (
                    <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0">
                      <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">
                          {user.displayName}
                        </span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                          {user.email}
                        </span>
                      </div>
                      <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                          <a
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Profile
                          </a>
                        </li>
                        <li>
                          <a
                            href="/course/create"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Create course
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            onClick={handleLogout}
                          >
                            Sign out
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden lg:flex items-center">
                <Link
                  to="/register"
                  className="text-white hover:text-gray-300 px-3 py-2"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-300 px-3 py-2"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SearchBar;
