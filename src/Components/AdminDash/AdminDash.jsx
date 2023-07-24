
import { NavLink } from "react-router-dom";  
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDash.css"; // Import the CSS file you created

const AdminDash = () => {

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

  return (
    <div className="max-w-[70%] mx-auto py-5 text-left text-white font-bold">

      {/* Disable Teachers */}
      <NavLink to="/disableTeachers" className="max-h-20 min-h-20 bg-[#7c38cd] rounded-lg p-4 shadow-lg my-2 flex items-center justify-between hover:bg-purple-600 transition-colors">
        disableTeachers
      </NavLink>

      {/* Edit Teachers */}
      <NavLink to="/editTeachers" className="max-h-20 min-h-20 bg-[#7c38cd] rounded-lg p-4 shadow-lg my-2 flex items-center justify-between hover:bg-purple-600 transition-colors">
        editTeachers
      </NavLink>

      {/* Disable Courses */}
      <NavLink to="/disableCourses" className="max-h-20 min-h-20 bg-[#7c38cd] rounded-lg p-4 shadow-lg my-2 flex items-center justify-between hover:bg-purple-600 transition-colors">
        disableCourses
      </NavLink>

      {/* Edit Courses */}
      <NavLink to="/editCourses" className="max-h-20 min-h-20 bg-[#7c38cd] rounded-lg p-4 shadow-lg my-2 flex items-center justify-between hover:bg-purple-600 transition-colors">
        editCourses
      </NavLink>

      
    </div>
  );
};

export default AdminDash;
