import axios from 'axios'; 
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DisableTeachers = () => {
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
  const [searchTerm, setSearchTerm] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const getTeachers = async () => {
      const { data } = await axios.get(
        'https://talent-forge-data.cyclic.app/teacher'
      );
      setTeachers(data);
    };
    getTeachers();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const teacherToggle = (teacher) => {
    const disableProp = {
      disabled: !teacher.disabled,
    };
    axios
      .put(
        `https://talent-forge-data.cyclic.app/teacher/edit/${teacher._id}`,
        disableProp
      )
      .then(() => {
        setTeachers((prevTeachers) =>
          prevTeachers.map((t) =>
            t._id === teacher._id ? { ...t, disabled: !teacher.disabled } : t
          )
        );
      })
      .catch((error) =>
        console.error('Error al actualizar el profesor:', error)
      );
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[600px] mx-auto py-5">
      <h1 className="text-3xl font-bold mb-6 text-center">Disable/Enable Teachers</h1>

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
          className={`max-h-20 min-h-20 ${
            teacher.disabled ? "bg-gray-400" : "bg-purple-700 text-white"
          } rounded-lg p-4 shadow-lg my-2 flex items-center justify-between transition-colors`}
        >
          {windowWidth > 600 && (
            <img
              src={teacher.profileImage}
              alt={teacher.name}
              className={`w-14 h-14 rounded-full object-cover mr-4 ${
                teacher.disabled ? "filter grayscale" : ""
              } transition-all`}
            />
          )}
          <div className="flex-1">
            <h2 className={`text-xl font-semibold ${teacher.disabled ? 'text-gray-600' : 'text-white'}`}>
              {teacher.name}
            </h2>
            <p className="text-gray-600">{teacher.subject}</p>
          </div>
          <button
            className={`px-4 py-2 ml-4 rounded ${
              teacher.disabled ? 'bg-gray-500' : 'bg-purple-500'
            } text-white font-bold`}
            onClick={() => teacherToggle(teacher)}
          >
            {teacher.disabled ? 'Enable' : 'Disable'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisableTeachers;
