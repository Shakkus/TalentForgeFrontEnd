import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseFilter from './Filter';
import './Home.css'

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

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

  useEffect(() => {
    getCourses();
  }, []);

  const handleFilter = (filteredCourses) => {
    setFilteredCourses(filteredCourses);
  };

  return (
    <div>
      <CourseFilter courses={courses} onFilter={handleFilter} />
      <div>
        {filteredCourses.map(course => (
            <div key={course._id} className="homeCourse" >
                <img src={course.image} alt="imagenDeCurso" />
                    <div className="infoCourse">
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                    </div>
                <a href='#' className="courseBtn"> Ingresar al curso </a>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Home;