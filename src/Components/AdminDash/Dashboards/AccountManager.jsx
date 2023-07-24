import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const DisableCourses = () => {

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


    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
        const { data } = await axios.get(
            "https://talent-forge-data.cyclic.app/user"
        );
        await setUsers(data.filter(user => user.accountType === 'teacher' || user.accountType === 'user'));
        };
        getUsers();
    }, []);

const courseToggle = async (user) => {
    if(user.accountType === 'user') {
        await axios.put(`https://talent-forge-data.cyclic.app/user/edit/${user._id}`, {accountType: 'teacher'})
        await axios.post("https://talent-forge-data.cyclic.app/teacher/", { "name": user.fullName, "email": user.username + "@talentforge.com.ar", "dateOfBirth": user.dateOfBirth, "country": user.country, "password": "admin123", "description": "I'm " + user.fullName + " teacher at Talent Forge.", "profileImage": user.profileImage, "courses": []})
        window.location.reload()
    }
    if(user.accountType === 'teacher') {
        await axios.put(`https://talent-forge-data.cyclic.app/user/edit/${user._id}`, {accountType: 'user'})
        const {data} = await axios.get(`https://talent-forge-data.cyclic.app/teacher/name/${user.fullName}`)
        await axios.delete(`https://talent-forge-data.cyclic.app/teacher/delete/${data[0]._id}`)
        window.location.reload()
    }
};

return (
    <div className="max-w-[70%] mx-auto py-5 text-left">
        <h1 className="text-2xl font-bold mb-4 text-center">Account Type Manager</h1>
        {users.map((user) => (
        <div key={user._id} className={`max-h-20 min-h-20 ${ user.disabled ? "bg-gray-400" : "bg-purple-700" } rounded-lg p-4 shadow-lg my-2 flex items-center justify-between transition-all`}>
            <h2 className={`text-white font-bold text-base ${user.disabled ? "text-gray-500" : ""}`}> {user.fullName} </h2>
            <button className={`px-4 py-2 rounded ${ user.disabled ? "bg-gray-500" : "bg-purple-500" } text-white font-bold`} onClick={() => courseToggle(user)}> {user.accountType} </button>
        </div>
      ))}
    </div>
  );
};

export default DisableCourses;
