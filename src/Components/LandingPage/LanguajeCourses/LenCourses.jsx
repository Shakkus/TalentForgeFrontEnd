import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { NavLink, useParams } from "react-router-dom";

const LenCourse = () => {
    const [courses, setCourses] = useState([]);

    useEffect(  () => {
        const fetchCourses = async() => {
            try {
                const response = await axios.get('https://talent-forge-data.cyclic.app/courses/');
                const filteredCourses = response.data.filter(course => course.cathegory === 'Idiom');
                setCourses(filteredCourses);
            } catch (error) {
                console.error('Error al obtener los cursos: ', error);
            }
        }
        fetchCourses();
    },[]);

    return(
        <div className='courses-container-landing'>
            <div className='courses-box-landing'>
            {courses.map((course) => (
                <div className='courseContainer flex flex-col justify-between border-2 hover:border-violet-600 transition-colors'>
                <img src={course.image} alt="Imagen del curso" />
                <h2>{course.title}</h2>
                <p className="justify-center">{course.description}</p>
                <p className="bg-gray-300 text-black w-40 mt-2 mx-auto rounded p-2">{course.teacher}</p>
               { /* <a href={course.link} target="_blank" rel="noopener noreferrer">Ver Curso</a> */}
                <div className="mt-auto">
                <NavLink to={`/course/${course._id}`} className="m-3 w-2"><h1 className="relative text-white bg-purple-500 p-3 w-40 mt-0 mx-auto rounded-xl mb-0 customHoverShadow">View course</h1></NavLink>

                </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default LenCourse;