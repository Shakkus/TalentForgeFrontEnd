import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './CodeCourse.css'

const CodeCourse = () => {
    const [courses, setCourses] = useState([]);
    useEffect(  () => {
        const fetchCourses = async() => {
            try {
                const response = await axios.get('https://talent-forge-data.cyclic.app/courses/');
                const filteredCourses = response.data.filter(course => course.cathegory === 'Programming');
                
                console.log();
                setCourses(filteredCourses);
            } catch (error) {
                console.error('Error al obtener los cursos: ', error);
            }
        }
        fetchCourses();
    },[]);
    return(
        <>
            {courses.map((course) => (
                <div key={course._id} className='courseContainer'>
                    <img src={course.image} alt="Imagen del curso" />
                    <h2>{course.title}</h2>
                    <p>{course.description}</p>
                    <p>{course.teacher}</p>
                    <a href={course.link} target="_blank" rel="noopener noreferrer">Ver Curso</a>
                </div>
            ))}
        </>
    )
}

export default CodeCourse;