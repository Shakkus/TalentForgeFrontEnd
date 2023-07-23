import { useEffect, useState} from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

const FormTeachersDash = () => {

    const [currentTeacher, setCurrentTeacher] = useState({})
    const [teacherInfo, setTeacherInfo] = useState({
            name: "",
            email: "",
            country: "",
            dateOfBirth: "",
            password: "",
            description: "",
            profileImage: ""
    })

    const countrys = [ "Argentina", "Chile", "Brasil", "Venezuela", "Bolivia", "Perú", "Colombia", "Ecuador", "México", "El Salvador", "Honduras", "España", "Panamá", "Cuba", "Costa Rica", "Uruguay", "Estados Unidos", "España", "Alemania", "Reino Unido", "Alemania", "Francia", "Italia", "Canadá", "Rusia"];
    const { id } = useParams();

    const handleSubmit = async (event) => {
        const teacherEdited = {
            name: teacherInfo.name === "" ? currentTeacher.name : teacherInfo.name,
            email: teacherInfo.email === "" ? currentTeacher.email : teacherInfo.email,
            country: teacherInfo.country === "" ? currentTeacher.country : teacherInfo.country,
            dateOfBirth: teacherInfo.dateOfBirth === "" ? currentTeacher.dateOfBirth : teacherInfo.dateOfBirth,
            password: teacherInfo.password === "" ? currentTeacher.password : teacherInfo.password,
            description: teacherInfo.description === "" ? currentTeacher.description : teacherInfo.description,
            profileImage: teacherInfo.profileImage === "" ? currentTeacher.profileImage : teacherInfo.profileImage
        };
        event.preventDefault();
        axios.put(`https://talent-forge-data.cyclic.app/teacher/edit/${id}`, teacherEdited)
        setTeacherInfo({
            name: "",
            email: "",
            country: "",
            dateOfBirth: "",
            password: "",
            description: "",
            profileImage: ""    
        })
    };  

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTeacherInfo((prevInfo) => ({...prevInfo, [name]: value ?? currentTeacher[name]}));
    };

    useEffect(() => {
        const getCurrentTeacher = async () => {
        const { data } = await axios.get( `https://talent-forge-data.cyclic.app/teacher/${id}`);
        setCurrentTeacher(data);
        };
            getCurrentTeacher()
      }, []); 



  return (
    <div>
        <form class="w-full max-w-lg" onSubmit={handleSubmit}>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="grid-first-name"> Name </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="grid-first-name" type="text" name="name" value={teacherInfo.name} onChange={handleChange} placeholder={currentTeacher.name}/>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="grid-password" > email adress </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="grid-password" type="email" name="email" value={teacherInfo.email} onChange={handleChange} placeholder={currentTeacher.email}/>
                </div>

                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="grid-password" > Password </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="grid-password" type="password" name="password" value={teacherInfo.password} onChange={handleChange} placeholder={currentTeacher.password} />
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="grid-city" > birthdate </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="grid-city" type="text" name="dateOfBirth" value={teacherInfo.dateOfBirth} onChange={handleChange} placeholder={currentTeacher.dateOfBirth} />
                </div>

                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="grid-state" > State </label>
                    <div class="relative">
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none" id="grid-state" name="country" value={teacherInfo.country} onChange={handleChange}>
                            <option value="">{currentTeacher.country}</option>
                            {countrys.map((country) => ( <option className="optionCountry" value={country}> {country} </option> ))}
                        </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" ><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="grid-description"> Description </label>
                        <textarea class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="grid-description" name="description" value={teacherInfo.description} onChange={handleChange} placeholder={currentTeacher.description} />
                    </div>

                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="grid-profile-image"> Profile Image </label>
                        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="grid-profile-image" type="text" name="profileImage" value={teacherInfo.profileImage} onChange={handleChange} placeholder={currentTeacher.profileImage}/>
                        <img src={currentTeacher.profileImage} alt="" />
                    </div>
                </div>
            </div>
            
            <div>
                <button type="submit" className="text-white bg-[#7c38cd] hover:bg-[#8244cf] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">EDIT</button>
            </div>
    </form>
</div>
  )
}

export default FormTeachersDash