import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const AdminDash = () => {
  // const [users, setUsers] = useState([])
  // const [teachers, setTeachers] = useState([])
  // const [courses, setCourses] = useState([])

  // const getUsers = () => {
  //     const { data } = axios.get('https://talent-forge-data.cyclic.app/user')
  //     setUsers(data)
  // }
  // const getCourses = () => {
  //     const { data } = axios.get('https://talent-forge-data.cyclic.app/courses')
  //     setCourses(data)
  // }
  // const getTeachers = () => {
  //     const { data } = axios.get('https://talent-forge-data.cyclic.app/teacher')
  //     setTeachers(data)
  // }

  // useEffect(() => {
  //     getCourses()
  //     getTeachers()
  //     getUsers()
  // }, []);

  const buttonStyle = "w-300 h-200 bg-8c56cc";

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Disable Users */}
      <NavLink to="/disableUsers">
        <div className={buttonStyle}>disableUsers</div>
      </NavLink>

      {/* Delete Users */}
      <div className={buttonStyle}>
        <NavLink to="/deleteUsers">deleteUsers</NavLink>
      </div>

      {/* Edit Users */}
      <div className={buttonStyle}>
        <NavLink to="/editUsers">editUsers</NavLink>
      </div>

      {/* Disable Teachers */}
      <div className={buttonStyle}>
        <NavLink to="/disableTeachers">disableTeachers</NavLink>
      </div>

      {/* Delete Teachers */}
      <div className={buttonStyle}>
        <NavLink to="/deleteTeachers">deleteTeachers</NavLink>
      </div>

      {/* Edit Teachers */}
      <div className={buttonStyle}>
        <NavLink to="/editTeachers">editTeachers</NavLink>
      </div>

      {/* Disable Courses */}
      <div className={buttonStyle}>
        <NavLink to="/disableCourses">disableCourses</NavLink>
      </div>

      {/* Delete Courses */}
      <div className={buttonStyle}>
        <NavLink to="/deleteCourses">deleteCourses</NavLink>
      </div>

      {/* Edit Courses */}
      <div className={buttonStyle}>
        <NavLink to="/editCourses">editCourses</NavLink>
      </div>
    </div>
  );
};

export default AdminDash;
