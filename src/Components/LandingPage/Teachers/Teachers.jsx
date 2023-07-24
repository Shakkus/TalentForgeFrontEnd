import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Teachers.css";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          "https://talent-forge-data.cyclic.app/teacher"
        );
        const teachers = response.data;
        setTeachers(teachers);
      } catch (error) {

        console.error("Error al obtener los profesores: ", error);

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

  const filteredTeachers = teachers.filter((teacher) => {
    return !teacher.disabled;
  });

  return (
    <div>
      {window.innerWidth <= 1440 ? (
        <div className="courses-container-landing-teacher flex overflow-x-scroll space-x-4 p-4">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher._id}
              className="flex-shrink-0 w-64 bg-gray-200 rounded-lg overflow-hidden teacher-card">
              <img
                src={teacher.profileImage}
                alt=""
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{teacher.name}</h2>
                <p className="text-sm h-20">
                  {truncateDescription(teacher.description, 100)}
                </p>
                <div className="mt-4">
                  <NavLink
                    to={`/teacher/${teacher._id}`}
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg">
                    See more →
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex space-x-4 p-4 ml-32">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher._id}
              className="flex-shrink-0 w-64 bg-gray-200 rounded-lg overflow-hidden teacher-card">
              <img
                src={teacher.profileImage}
                alt=""
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{teacher.name}</h2>
                <p className="text-sm">
                  {truncateDescription(teacher.description, 100)}
                </p>
                <div className="mt-4">
                  <NavLink
                    to={`/teacher/${teacher._id}`}
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg">
                    See more →
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teachers;