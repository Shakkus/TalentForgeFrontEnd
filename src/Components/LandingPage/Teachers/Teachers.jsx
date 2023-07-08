import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Teachers.css';

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
          <img src={teacher.profileImage} alt="" className="w-200px rounded-t-lg my-0 mx-auto" />
          <h2 className="flex my-2 font-semibold">{teacher.name}</h2>
          <p className="p-4 text-start">{truncateDescription(teacher.description, 205)}</p>
        </div>
      ))}
    </>
  );
};

export default Teachers;
