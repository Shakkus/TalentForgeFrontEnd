import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "../CodeCourses/CodeCourse.css";

const LenCourse = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://talent-forge-data.cyclic.app/courses/"
        );
        const filteredCourses = response.data.filter(
          (course) => course.cathegory === "languages"
        );
        setCourses(filteredCourses.slice(0, 5));
      } catch (error) {
        console.error("Error al obtener los cursos: ", error);
      }
    };
    fetchCourses();
  }, []);



  return (
    <div>
      {window.innerWidth <= 1440 ? (
        <div className="courses-container-landing-len overflow-x-scroll">
          <div className="courses-box-landing">
            {courses.map((course) => (
              <div className="courseContainer justify-between border-2 hover:border-violet-600 transition-colors">
                <img src={course.image} alt="Imagen del curso" />
                <h2>{course.title}</h2>
                <p className="justify-center h-10">{course.description}</p>
                <p className="bg-gray-300 text-black w-40 mt-2 mx-auto rounded p-2">
                  {course.teacher}
                </p>
                {/* <a href={course.link} target="_blank" rel="noopener noreferrer">Ver Curso</a> */}
                <div className="mt-auto">
                  <NavLink to={`/course/${course._id}`} className="m-3 w-2">
                    <h1 className="relative text-white bg-purple-500 p-3 w-40 mt-0 mx-auto rounded-xl mb-0 customHoverShadow">
                      View course
                    </h1>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="courses-container-landing">
          <div className="courses-box-landing">
            {courses.map((course) => (
              <div className="courseContainer flex flex-col justify-between border-2 hover:border-violet-600 transition-colors">
                <img src={course.image} alt="Imagen del curso" />
                <h2>{course.title}</h2>
                <p className="justify-center">{course.description}</p>
                <p className="course-teacher bg-gray-300 text-black w-40 mt-2 mx-auto rounded p-2 max-lg:w-20">
                  {course.teacher}
                </p>
                {/* <a href={course.link} target="_blank" rel="noopener noreferrer">Ver Curso</a> */}
                <div className="div-Navlink mx-auto my-0 w-40">
                  <NavLink
                    to={`/course/${course._id}`}
                    className="navlink-view m-3 w-2">
                    <h1 className="button-view relative text-white bg-purple-500 p-3 mt-0 mx-auto rounded-xl mb-0  customHoverShadow">
                      View course
                    </h1>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LenCourse;
