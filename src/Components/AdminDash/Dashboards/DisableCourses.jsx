import { useEffect, useState } from "react";
import axios from "axios";

const DisableCourses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para almacenar el término de búsqueda

  useEffect(() => {
    const getCourses = async () => {
      const { data } = await axios.get(
        "https://talent-forge-data.cyclic.app/courses"
      );
      setCourses(data);
    };
    getCourses();
  }, []);

  const courseToggle = (course) => {
    const disableProp = {
      disabled: !course.disabled,
    };
    axios
      .put(`https://talent-forge-data.cyclic.app/courses/edit/${course._id}`, disableProp)
      .then(() => {
        setCourses((prevCourses) =>
          prevCourses.map((c) => (c._id === course._id ? { ...c, disabled: !course.disabled } : c))
        );
      })
      .catch((error) => console.error("Error al actualizar el curso:", error));
  };

  // Función para filtrar los cursos basados en el término de búsqueda
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[70%] mx-auto py-5 text-left">
      <h1 className="text-2xl font-bold mb-4 text-center">Disable/Enable Courses</h1>

      {/* Agregar la barra de búsqueda */}
      <input
        type="text"
        placeholder="Search courses"
        className="w-full p-2 border rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredCourses.map((course) => (
        <div
          key={course._id}
          className={`max-h-20 min-h-20 ${
            course.disabled ? "bg-gray-400" : "bg-purple-700"
          } rounded-lg p-4 shadow-lg my-2 flex items-center justify-between transition-all`}
        >
          <h2 className={`text-white font-bold text-base ${course.disabled ? "text-gray-500" : ""}`}>
            {course.title}
          </h2>
          <button
            className={`px-4 py-2 rounded ${
              course.disabled ? "bg-gray-500" : "bg-purple-500"
            } text-white font-bold`}
            onClick={() => courseToggle(course)}
          >
            {course.disabled ? "Enable" : "Disable"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisableCourses;
