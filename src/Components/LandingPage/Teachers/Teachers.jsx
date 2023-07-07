import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './Teachers.css'

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(  () => {
        const fetchTeachers = async() => {
            try {
                const response = await axios.get('https://talent-forge-data.cyclic.app/teacher');
                const teachers = response.data
                setTeachers(teachers);
            } catch (error) {
                console.error('Error al obtener los profesores: ', error);
            }
        }
        fetchTeachers();
    },[]);

    return(
        <>
            {teachers.map((teacher) => (
                <div key={teacher._id} className='teachersContainer'>
                <img src={teacher.profileImage} alt="" />
                <h2>{teacher.name}</h2>
                <p>{teacher.description}</p>    
                </div>
            ))}
        </>
    )
}

export default Teachers;