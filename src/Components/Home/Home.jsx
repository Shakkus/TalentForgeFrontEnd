import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseFilter from "./Filter";
import "./Home.css";
import Loading from "../../Loading/Loading";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";

const Home = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [getting, setGetting] = useState(true); // Estado para controlar si se están cargando los cursos

  const { user, logOut, loading } = useAuth();
  console.log(user);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const { data } = await axios.get(
        "https://talent-forge-data.cyclic.app/courses"
      );
      setCourses(data);
      setFilteredCourses(data);
      setGetting(false); // Se han cargado los cursos, actualizar el estado de getting
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (filteredCourses) => {
    setFilteredCourses(filteredCourses);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  /*LOGICA PARA LLEVAR CURSOS AL LOCALSTORAGE*/
  let cartCourses = [];
  const addCourseToCart = (course) => {
    const existingCourses = localStorage.getItem("cartCourses");

    if (existingCourses) {
      cartCourses = JSON.parse(existingCourses);

      const isCourseInCart = cartCourses.some(
        (cartCourse) => cartCourse._id === course._id
      );

      if (isCourseInCart) {
        console.log("Curso ya en carrito");
        return;
      }
    }
    cartCourses.push(course);

    localStorage.setItem("cartCourses", JSON.stringify(cartCourses));

    console.log(cartCourses);
  };

  if (loading === true || getting === true) {
    return <Loading />;
  }

  return (
    <div className="home">
      <CourseFilter courses={courses} onFilter={handleFilter} />
      {user && (
        <>
          <button
            className="bg-[#7c38cd] hover:bg-[#AA6FFF] text-white font-bold py-2 px-4 rounded m-5"
            onClick={handleLogOut}
          >
            LogOut
          </button>
          <h1>welcome {user.displayName}</h1>
        </>
      )}

      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
        <div className="-mx-2 flex flex-wrap">
          {filteredCourses.map((course) => (
            <NavLink
              key={course._id}
              to={`/course/${course._id}`}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4"
            >
              <div className="overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={course.image}
                    alt="Course Image"
                    className="object-cover w-64 h-36 border border-[#AA6FFF]"
                  />
                </div>

                <div className="bg-py-0.1 px-2 md:px-4 text-left">
                  <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
                  <p className="text-gray-600 mb-2">{course.teacher}</p>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 mr-1">&#9733;</span>
                    <span className="text-gray-600">{course.rating}</span>
                  </div>
                  <p className="text-gray-600 mb-4">${course.prize}</p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
