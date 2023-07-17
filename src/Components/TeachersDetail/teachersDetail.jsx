import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import "./teachersDetail.css";
const defaultProfileImage = "https://img.freepik.com/fotos-premium/lindo-carpincho-sombrero-gafas-listo-viajar-maleta-azul-fondo-azul_498722-912.jpg"

const TeachersDetail = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState({});

  const getTeacherInfo = async () => {
    try {
      const { data } = await axios.get(`https://talent-forge-data.cyclic.app/teacher/${id}`);
      setTeacher(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTeacherInfo();
  }, []);

  return (
    <div className="flex" id='instructor-container'>
      <div className="w-1/3">
        <img
          src={teacher.profileImage || defaultProfileImage}
          alt="Foto de perfil"
          className="w-full rounded-full"
          id='instructor-photo'
        />
      </div>
      <div className="w-2/3 px-8">
        <div>
          <h2 className="text-2xl font-bold text-[#7c38cd]" id="insctructor-text">Instructor</h2>
          <h3 className="text-lg font-semibold text-[#aa6fff]" id="insctructor-text">{teacher.name}</h3>
          <p className="mt-4" id="insctructor-text">{teacher.description}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#7c38cd]">Mis cursos</h2>
          <div className="flex flex-wrap mt-4">
            {teacher.courses &&
              teacher.courses.map((course) => (
                <div key={course.title} className="w-1/2 p-4">
                  <img src={course.image} alt={course.title} className="w-full rounded-lg" />
                  <h3 className="mt-2 text-lg font-semibold">{course.title}</h3>
                  <p>{course.description}</p>
                  <a href={course.link} className="text-blue-500 hover:underline">
                    Ver más
                  </a>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersDetail;
