import {useEffect, useState} from 'react'
import axios from 'axios'

const DisableTeachers = () => {


const [teachers, setTeachers] = useState([])   

useEffect(() => {
  const getTeachers = async () => {
    const { data } = await axios.get(
      "https://talent-forge-data.cyclic.app/teacher"
    );
    setTeachers(data);
  };
  getTeachers()
}, []); 

const courseToggle = (teacher) => {
  const disableProp = {
    "disabled": !teacher.disabled
  };
  axios.put(`https://talent-forge-data.cyclic.app/teacher/edit/${teacher._id}`, disableProp)
    .then(() => window.location.reload())
    .catch((error) => console.error("Error al actualizar el curso:", error));
};

  return (
    <>
      {teachers.map(teacher => (
      <>
        <img src={teacher.profileImage} alt="" />
        <h1> {teacher.name} </h1>
        <button onClick={() => courseToggle(teacher)}> {teacher.disabled ? "Disable" : "Enable"  } </button> 
      </>
    ))}  
    </>
  )
}

export default DisableTeachers