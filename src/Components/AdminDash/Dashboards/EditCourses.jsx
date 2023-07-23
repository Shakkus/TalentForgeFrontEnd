import {useEffect, useState} from 'react'
import axios from 'axios'
import { Navigate, useNavigate} from 'react-router'

const EditCourses = () => {
  const navigate = useNavigate()

  const [courses, setCourses] = useState([])   

  useEffect(() => {
    const getCourses = async () => {
      const { data } = await axios.get(
        "https://talent-forge-data.cyclic.app/courses"
      );
      setCourses(data);
    };
    getCourses()
  }, []); 


  return (
    <>
      {courses.map(course => (
      <>
        <img src={course.image} alt="" />
        <h1> {course.name} </h1>
        <button onClick={() => navigate(`/editCourses/edit/${course._id}`)}> EDIT </button> 
      </>
    ))}  
    </>
  )
}

export default EditCourses