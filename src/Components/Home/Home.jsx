import { useEffect, useState } from "react";
import axios from "axios";
import './Home.css'
const Home = () => {
    const [courses,setCourses] = useState([]);

    useEffect(() => {
        const fetchCoursesHome = async () => {
            try {
                const response = await axios.get('https://talent-forge-data.cyclic.app/courses/');
                const apiCourses = response.data;
                setCourses(apiCourses)
            } catch (error) {
                console.error('Error al traer los cursos: ',error);
            }
        }
        fetchCoursesHome();
    },[])

    return (
        <>  
            <h2>A VER SI SE GENERAS</h2>
            <h2>Este es el componente HOME</h2>
            {courses.map((course) => (
                <div key={course._id} className="homeCourse" >
                    <img src={course.image} alt="imagenDeCurso" />
                    <div className="infoCourse">
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                    </div>
                    <a href='#' className="courseBtn"> Ingresar al curso </a>
                </div>
            ))}
        </>
    )
}

export default Home;