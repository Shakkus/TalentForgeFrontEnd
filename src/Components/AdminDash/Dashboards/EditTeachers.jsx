import {useEffect, useState} from 'react'
import axios from 'axios'
import { Navigate, useNavigate} from 'react-router'

const EditTeachers = () => {
  const navigate = useNavigate()

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


  return (
    <>
      {teachers.map(teacher => (
      <>
        <img src={teacher.profileImage} alt="" />
        <h1> {teacher.name} </h1>
        <button onClick={() => navigate(`/editTeachers/edit/${teacher._id}`)}> EDIT </button> 
      </>
    ))}  
    </>
  )
}

export default EditTeachers