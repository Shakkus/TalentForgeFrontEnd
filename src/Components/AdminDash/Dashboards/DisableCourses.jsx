import {useEffect, useState} from 'react'
import axios from 'axios'

const DisableCourses = () => {


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

const courseToggle = (course) => {
  const disableProp = {
    "disabled": !course.disabled
  };
  axios.put(`https://talent-forge-data.cyclic.app/courses/edit/${course._id}`, disableProp)
    .then(() => window.location.reload())
    .catch((error) => console.error("Error al actualizar el curso:", error));
};

  return (
    <>
      {courses.map(course => (
      <>
        <img src={course.image} alt="" />
        <h1> {course.title} </h1>
        <button onClick={() => courseToggle(course)}> {course.disabled ? "Disable" : "Enable"  } </button> 
      </>
    ))}  
    </>
  )
}

export default DisableCourses