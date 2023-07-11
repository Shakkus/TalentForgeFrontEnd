import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseFilter from './Filter';
import './Home.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/authContext.js";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const navigate = useNavigate()

  const getCourses = async () => {
    try {
      const { data } = await axios.get('https://talent-forge-data.cyclic.app/courses');
      console.log(data);
      setCourses(data);
      setFilteredCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const { user, logOut, loading } = useAuth()
  console.log(user)

  useEffect(() => {
    getCourses();
  }, []);

  const handleFilter = (filteredCourses) => {
    setFilteredCourses(filteredCourses);
  };

  const handleLogOut = async () => {
    try {
      await logOut()
      navigate("/")
    } catch (error) {

      console.error(error)
    }

  }

  if (loading === true) return <h1>loading</h1>

  return (
    <div className='home'>
      <CourseFilter courses={courses} onFilter={handleFilter} />
      <button onClick={handleLogOut}>LogOut</button>
      <h1>welcome {user.displayName && user.displayName || user.email}</h1>
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
