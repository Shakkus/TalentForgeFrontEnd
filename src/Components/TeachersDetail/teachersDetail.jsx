import React from "react";
import "../Home/Home.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import "./teachersDetail.css";

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
          src={teacher.profileImage}
          alt="Foto de perfil"
          className="teacher-img-detail w-full rounded-full"
          id='instructor-photo'
        />
      </div> 
      <div className="w-2/3 px-8">
        <div>
          <h2 className="text-2xl font-bold text-[#7c38cd]" id="insctructor-text">Instructor</h2>
          <h3 className="text-lg font-semibold text-[#aa6fff]" id="insctructor-text">{teacher.name}</h3>
          <p className="teacherDescription mt-4" id="insctructor-text">{teacher.description}</p>
        </div>
        <div className="mt-8 mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-[#7c38cd] max-md:text-xl text-center">My courses</h2>
          <div className="flex flex-wrap mt-4">
            {teacher.courses &&
              teacher.courses.map((course) => (
                <div key={course.title} className="teacherCourses">
                  <img src={course.image} alt={course.title} className="teacherCourseImage w-64 h-32" />
                  <h3 className="teacherCourseTitle mt-2 font-semibold">{course.title}</h3>
                  <p className="teacherCourseDescription">{course.description}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersDetail;