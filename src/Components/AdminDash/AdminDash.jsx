import {useEffect, useState} from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'


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

    

  return (
    <>
        <NavLink to='/disableUsers'>    <button className="dashboard">disableUsers</button>     </NavLink>
        <NavLink to='/deleteUsers'>     <button className="dashboard">deleteUsers</button>      </NavLink>
        <NavLink to='/editUsers'>       <button className="dashboard">editUsers</button>        </NavLink>
        <NavLink to='/disableTeachers'> <button className="dashboard">disableTeachers</button>  </NavLink>
        <NavLink to='/deleteTeachers'>  <button className="dashboard">deleteTeachers</button>   </NavLink>
        <NavLink to='/editTeachers'>    <button className="dashboard">editTeachers</button>     </NavLink>
        <NavLink to='/disableCourses'>  <button className="dashboard">disableCourses</button>   </NavLink>
        <NavLink to='/deleteCourses'>   <button className="dashboard">deleteCourses</button>    </NavLink>
        <NavLink to='/editCourses'>     <button className="dashboard">editCourses</button>      </NavLink>
    </>
  )
}

export default AdminDash