import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDetail.css";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

const StudentDetail = () => {

  const navigate = useNavigate();
	  // VALIDACION DE USUARIO
	  useEffect(() => {
		if (localStorage.getItem("loggedUser")) return 
		else if (localStorage.getItem("username")) return 
		else if (!localStorage.getItem("username")) navigate('/login')
		else if (!localStorage.getItem("loggedUser")) navigate('/login')
	  }, [navigate]); 
	  // -----------------------------

    const [userCourses, setUserCourses] = useState([])

  return (
    <div className="flex" id="student-container">
      <div className="w-1/3">
        <img src={localStorage.getItem('userImage')} alt="Foto de perfil" className="w-full rounded-full" id="student-photo" />
        <h3 className="text-lg font-semibold text-[#aa6fff]"> {localStorage.getItem('username')} </h3>
      </div>

      <div className="w-2/3 px-8" id="student-text">
        <div>
          <h2 className="text-2xl font-bold text-[#7c38cd]">Student</h2>
          <h3 className="text-lg font-semibold text-[#aa6fff]"> {localStorage.getItem('userfullName')} </h3>
          <p>{ localStorage.getItem('userEmail') }</p><br/>
          
        </div>
      </div>

      <div>
        
      </div>
    </div>
  );
};

export default StudentDetail;
