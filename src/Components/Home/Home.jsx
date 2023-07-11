import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseFilter from './Filter';
import './Home.css'
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const getCourses = async () => {
    try {
      const { data } = await axios.get('https://talent-forge-data.cyclic.app/courses');
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
  /*LOGICA PARA LLEVAR CURSOS AL LOCALSTORAGE*/
  let cartCourses = [];
  const addCourseToCart = (course) => {

    const existingCourses = localStorage.getItem('cartCourses') ;
    
    
    if (existingCourses){
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
      <div className='courses'>
        {filteredCourses.map(course => (
            <div key={course._id} className="courseIndividual">
                <img src={course.image} alt="imagenDeCurso" />
                <div className="infoCourse">
                <div className="course-duration"> {course.duration} </div>
                <h2 className='course-title'>{course.title}</h2>
                <p className='course-desc'>{course.description}</p>
                </div>
                <div className="btn-container">
                  <button className="courseBtn"> <NavLink to={`http://localhost:3000/course/${course._id}`}> View Course </NavLink> </button>
                  <button className='addCourseCart' onClick={() => addCourseToCart(course)}>Agregar al carrito</button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Home;