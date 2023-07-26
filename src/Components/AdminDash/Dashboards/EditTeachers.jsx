import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

const EditTeachers = () => {

  const navigate = useNavigate();
	  // VALIDACION DE USUARIO
	  useEffect(() => {
    if (localStorage.getItem("userAccountType") !== 'admin') navigate('/')
    else if (localStorage.getItem("userAccountType") === 'admin') return 
		else if (localStorage.getItem("loggedUser")) return 
		else if (localStorage.getItem("username")) return 
		else if (!localStorage.getItem("username")) navigate('/login')
		else if (!localStorage.getItem("loggedUser")) navigate('/login')
	  }, [navigate]); 
	  // -----------------------------


  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Nuevo estado para almacenar el término de búsqueda

  useEffect(() => {
    const getTeachers = async () => {
      const { data } = await axios.get(
        "https://talent-forge-data.cyclic.app/teacher"
      );
      setTeachers(data);
    };
    getTeachers();
  }, []);

  // Función para filtrar los profesores basados en el término de búsqueda
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[70%] mx-auto py-5 text-left">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit ur teachers</h1>

      {/* Agregar la barra de búsqueda */}
      <input
        type="text"
        placeholder="Search teachers"
        className="w-full p-2 border rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredTeachers.map((teacher) => (
        <div
          key={teacher._id}
          className="max-h-20 min-h-20 bg-[#7c38cd] rounded-lg p-4 shadow-lg my-2 flex items-center justify-between hover:bg-purple-600 transition-colors"
        >
          <h2 className="text-white font-bold text-base">{teacher.name}</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 text-white cursor-pointer hover:border-white"
            onClick={() => navigate(`/editTeachers/edit/${teacher._id}`)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default EditTeachers;
