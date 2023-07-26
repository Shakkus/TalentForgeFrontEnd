import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./StudentDetail.css";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import axios from "axios";

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

    useEffect(() => {
        const purchaseValidator = async () => {
            try {
            if(localStorage.getItem('userId') === null) return
                else {
                const { data } = await axios.get(`https://talent-forge-data.cyclic.app/user/${localStorage.getItem('userId')}`);
                setUserCourses(data.purchasedCourses) ;
                console.log(data.purchasedCourses)
                }
            } catch (error) {
                console.log(error.message)
            }
    };
        purchaseValidator()
}, [])

    const [userCourses, setUserCourses] = useState([])
    const authUser = useAuth().user

return (
    <div className="flex" id="student-container">
        <div className="w-2/3 flex flex-col items-center gap-4">
            <img src={localStorage.getItem('userImage') || authUser?.photoURL} alt="Foto de perfil" className="w-full rounded-full" id="student-photo" />
            {localStorage.getItem('userId') && <NavLink to={`edit/${localStorage.getItem('userId')}`}> <button class="bg-[#7c38cd] hover:bg-purple-900 text-white font-bold py-2 px-4 rounded">Edit Profile</button> </NavLink>}
            <h3 className="text-lg font-semibold text-[#aa6fff]">{localStorage.getItem('username') || authUser?.displayName}</h3>
        </div>

        <div className="w-1/3 px-8" id="student-text">
            <div>
                <h2 className="text-2xl font-bold text-[#7c38cd]">Student</h2>
                <h3 className="text-lg font-semibold text-[#aa6fff]"> {localStorage.getItem('userfullName')|| authUser?.displayName } </h3>
                <p>{ localStorage.getItem('userEmail') || authUser?.email }</p><br/>
            </div>
        </div>

        <div className="mt-8 px-2 py-2 space-y-4">
            {authUser && (
                <p className="text-center text-red-500 font-semibold">
                You need a talent forge account to purchase courses :/
                </p>
            )}
            <h2 className="text-2xl font-bold text-[#7c38cd]">My Courses</h2>
            {userCourses ? (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {userCourses.map((course) => (
                    <div key={course.title} className="bg-white rounded-lg p-4 shadow">
                    <img src={course.image} alt="" className="w-full h-32 object-cover rounded" />
                    <h1 className="text-lg font-semibold mt-2">{course.title}</h1>
                    <h3 className="text-gray-500 mt-1">{course.teacher}</h3>
                    </div>
                ))}
                </div>
            ) : (
                <p className="text-center font-semibold">You dont have courses</p>
            )}
            </div>
        </div>
    );
};

export default StudentDetail;
