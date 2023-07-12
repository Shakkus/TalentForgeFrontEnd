
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseFilter from './Filter';
import './Home.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/authContext.js";



const Home = () => {
  const navigate = useNavigate();


  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);


  const { user, logOut, loading } = useAuth()

  
  // VALIDACION DE USUARIO LOGEADO
  useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");
		if (!loggedUser) navigate("/login");
	}, []);
  // -----------------------------
  

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);


  const handleFilter = (filteredCourses) => {
    setFilteredCourses(filteredCourses);
  };


  if (loading === true) return <h1>loading</h1>


  /*LOGICA PARA LLEVAR CURSOS AL LOCALSTORAGE*/
  let cartCourses = [];
  const addCourseToCart = (course) => {

    const existingCourses = localStorage.getItem('cartCourses');


    if (existingCourses) {
      cartCourses = JSON.parse(existingCourses);

      const isCourseInCart = cartCourses.some((cartCourse) => cartCourse._id === course._id)

      if (isCourseInCart) {
        console.log('Curso ya en carrito');
        return;
      }
    }
    cartCourses.push(course);

    localStorage.setItem('cartCourses', JSON.stringify(cartCourses));

    console.log(cartCourses);
  }



  return (
    <div className='home'>
      <CourseFilter courses={courses} onFilter={handleFilter} />
      {/* <h1>welcome {user.displayName && user.displayName || user.email}</h1> */}
      <div>
        {filteredCourses.map(course => (
          <div key={course._id} className="homeCourse" >
            <img src={course.image} alt="imagenDeCurso" />
            <div className="course-duration"> {course.duration} </div>
            <div className="infoCourse">
              <h2 className='course-title'>{course.title}</h2>
              <p className='course-desc'>{course.description}</p>
            </div>

            <a className="courseBtn"> <NavLink to={`http://localhost:3000/course/${course._id}`}> View Course </NavLink> </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
