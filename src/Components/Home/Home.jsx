import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CourseFilter from "./Filter";
import "./Home.css";
import Loading from "../Loading/Loading";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
import { CartContext } from "../../CartContext";

const Home = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [getting, setGetting] = useState(true); // Estado para controlar si se están cargando los cursos
  const { setCartCount } = useContext(CartContext);
  const [showPopup, setShowPopUp] = useState(false); //Logica de Pop Up para carrito

  const { logOut, loading, user } = useAuth();

  useEffect(() => {
    getCourses();
    console.log(user);
  }, []);

  // VALIDACION DE USUARIO LOGEADO
  useEffect(() => {
    if (localStorage.getItem("loggedUser")) navigate("/home");
    else if (localStorage.getItem("username")) navigate("/home");
    else if (!localStorage.getItem("username")) navigate("/login");
    else if (!localStorage.getItem("loggedUser")) navigate("/login");
  }, [navigate]);
  // -----------------------------

  const getCourses = async () => {
    try {
      const { data } = await axios.get(
        "https://talent-forge-data.cyclic.app/courses"
      );
      setCourses(data);
      setFilteredCourses(data.filter((course) => course.disabled === false));
      setGetting(false); // Se han cargado los cursos, actualizar el estado de getting
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (filteredCourses) => {
    setFilteredCourses(
      filteredCourses.filter((course) => course.disabled === false)
    );
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) {
      return "No ratings yet";
    }

    const totalRatings = ratings.length;
    const ratingSum = ratings.reduce(
      (total, userSentRating) => total + userSentRating.rating,
      0
    );

    const ratingAverage = ratingSum / totalRatings;
    const roundedRating = Math.round(ratingAverage);
    return roundedRating;
  };

  let cartCourses = [];
  const addCourseToCart = (course) => {
    const existingCourses = localStorage.getItem("cartCourses");
    if (existingCourses) {
      cartCourses = JSON.parse(existingCourses);
      const isCourseInCart = cartCourses.some(
        (cartCourse) => cartCourse._id === course._id
      );

      setShowPopUp(true); //Logica pop up

      setTimeout(() => {
        setShowPopUp(false);
      }, 3000);

      if (isCourseInCart) {
        console.log("Curso ya en carrito");
        return;
      }
    }
    setShowPopUp(true); //Logica pop up
    setTimeout(() => {
      setShowPopUp(false);
    }, 2000);

    cartCourses.push(course);
    localStorage.setItem("cartCourses", JSON.stringify(cartCourses));
    setCartCount(cartCourses.length);
  };

  if (loading === true || getting === true) {
    return < Loading/>;
  }
  return (
    <div className="home">
      <CourseFilter courses={courses} onFilter={handleFilter} />
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
        <div className="-mx-2 flex flex-wrap">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
              <div className="overflow-hidden  ">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={course.image}
                    alt="Course Image"
                    className="object-cover w-64 h-36 border border-[#AA6FFF] my-0 mx-auto"
                  />
                </div>
                <div className="bg-py-0.1 px-2 md:px-4 text-left">
                  <h2 className="text-lg font-semibold mb-2 h-14">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 mb-2">{course.teacher}</p>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 mr-1">&#9733;</span>
                    <span className="text-gray-600 font-medium mr-2">
                      {calculateAverageRating(course.interactions.ratings)}
                    </span>
                    {course.interactions.ratings &&
                      course.interactions.ratings.length !== 0 && (
                        <span className="text-purple-600 text-sm">
                          ({course.interactions.ratings.length} ratings)
                        </span>
                      )}
                  </div>
                  <p className="text-gray-600 mb-3">${course.prize}</p>
                </div>
              </div>
              <div>
                <NavLink
                  to={`/course/${course._id}`}
                  class="py-2 px-4 rounded m-5">
                  Ver Curso
                </NavLink>
                <button
                  onClick={() => addCourseToCart(course)}
                  class="bg-[#7c38cd] hover:bg-[#AA6FFF] text-white font-bold py-2 px-4 rounded m-5">
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
        {showPopup && (
          <div className="popup ">
            <p className="max-lg:text-base">Course added to cart!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
