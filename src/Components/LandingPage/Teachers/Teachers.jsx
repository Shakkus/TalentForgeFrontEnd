import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Teachers.css';
import { NavLink } from 'react-router-dom';


const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('https://talent-forge-data.cyclic.app/teacher');
        const teachers = response.data;
        setTeachers(teachers);
      } catch (error) {
        console.error('Error al obtener los profesores: ', error);
      }
    };
    fetchTeachers();
  }, []);

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    } else {
      return description;
    }
  };

  return (
    <>
      {teachers.map((teacher) => (
        <div key={teacher._id} className="teachersContainer w-80 m-10 border h-auto bg-gray-300 rounded-3xl mx-5">

          <div className='container-img'> 
            <img src={teacher.profileImage} alt="" className="fix-img w-200px rounded-t-lg my-0 mx-auto" />
            <h2 className="fix-center flex my-2 font-semibold">{teacher.name}</h2>
          </div>

          <div className='container-desc'> 
            <p className="p-4 text-start">{truncateDescription(teacher.description, 100)}</p>
          </div>

          <div className='container-btn'> 
            <div className="mt-auto">
              <NavLink to={`/teacher/${teacher._id}`} className="m-3 w-2"><h1 className="relative text-white bg-gray-400 p-3 w-40 mt-0 mx-auto rounded-xl mb-0 customHoverShadow">See more →</h1></NavLink>
            </div>
          </div>

        </div>
      ))}
    </>
  );
  
};

export default Teachers;
