import { useParams } from "react-router";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const FormTeachersDash = () => {
  const navigate = useNavigate();
  // VALIDACION DE USUARIO
  useEffect(() => {
    if (localStorage.getItem("userAccountType") !== "admin") navigate("/");
    else if (localStorage.getItem("userAccountType") === "admin") return;
    else if (localStorage.getItem("loggedUser")) return;
    else if (localStorage.getItem("username")) return;
    else if (!localStorage.getItem("username")) navigate("/login");
    else if (!localStorage.getItem("loggedUser")) navigate("/login");
  }, [navigate]);
  // -----------------------------

  const [currentTeacher, setCurrentTeacher] = useState({});
  const [teacherInfo, setTeacherInfo] = useState({
    name: "",
    email: "",
    country: "",
    dateOfBirth: "",
    password: "",
    description: "",
    profileImage: "",
  });

  const countrys = [
    // ... (lista de países)
  ];
  const { id } = useParams();

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSubmit = async (event) => {
    const teacherEdited = {
      name: teacherInfo.name === "" ? currentTeacher.name : teacherInfo.name,
      email:
        teacherInfo.email === "" ? currentTeacher.email : teacherInfo.email,
      country:
        teacherInfo.country === ""
          ? currentTeacher.country
          : teacherInfo.country,
      dateOfBirth:
        teacherInfo.dateOfBirth === ""
          ? currentTeacher.dateOfBirth
          : teacherInfo.dateOfBirth,
      password:
        teacherInfo.password === ""
          ? currentTeacher.password
          : teacherInfo.password,
      description:
        teacherInfo.description === ""
          ? currentTeacher.description
          : teacherInfo.description,
      profileImage:
        teacherInfo.profileImage === ""
          ? currentTeacher.profileImage
          : teacherInfo.profileImage,
    };
    event.preventDefault();
    axios.put(
      `https://talent-forge-data.cyclic.app/teacher/edit/${id}`,
      teacherEdited
    );
    setTeacherInfo({
      name: "",
      email: "",
      country: "",
      dateOfBirth: "",
      password: "",
      description: "",
      profileImage: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeacherInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value ?? currentTeacher[name],
    }));
  };

  useEffect(() => {
    const getCurrentTeacher = async () => {
      const { data } = await axios.get(
        `https://talent-forge-data.cyclic.app/teacher/${id}`
      );
      setCurrentTeacher(data);
    };
    getCurrentTeacher();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-start w-full mx-auto md:w-2/3 py-10 text-left">
      <div className="w-full md:w-1/3 p-4">
        <img
          src={currentTeacher.profileImage}
          alt=""
          className="w-300 h-300 mb-2 mx-auto md:mx-0"
        />
        <input
          className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="grid-profile-image"
          type="text"
          name="profileImage"
          value={teacherInfo.profileImage}
          onChange={handleChange}
          placeholder="Change profile image URL"
        />
      </div>

      <div className="w-full md:w-2/3 p-4">
        <button
          type="button"
          onClick={handleGoBack}
          className="mb-4 text-white bg-[#7c38cd] hover:bg-[#8244cf] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Go Back
        </button>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap mb-4">
            <div className="w-full px-3 mb-2">
              <label
                className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Name
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="grid-first-name"
                type="text"
                name="name"
                value={teacherInfo.name}
                onChange={handleChange}
                placeholder={currentTeacher.name}
              />
            </div>
          </div>

          <div className="flex flex-wrap mb-4">
  <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
    <label
      className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
      htmlFor="grid-city"
    >
      Birthdate
    </label>
    <input
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      id="grid-city"
      type="text"
      name="dateOfBirth"
      value={teacherInfo.dateOfBirth}
      onChange={handleChange}
      placeholder={currentTeacher.dateOfBirth}
    />
  </div>

  <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
    <label
      className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
      htmlFor="grid-state"
    >
      State
    </label>
    <div className="relative">
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"
        id="grid-state"
        name="country"
        value={teacherInfo.country}
        onChange={handleChange}
      >
        <option value="">{currentTeacher.country}</option>
        {countrys.map((country) => (
          <option
            className="optionCountry"
            value={country}
            key={country}
          >
            {country}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
</div>

<div className="flex flex-wrap mb-4">
  <div className="w-full px-3 mb-2 md:mb-0">
    <label
      className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
      htmlFor="grid-description"
    >
      Description
    </label>
    <textarea
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      id="grid-description"
      name="description"
      value={teacherInfo.description}
      onChange={handleChange}
      placeholder={currentTeacher.description}
    />
  </div>

  <div className="w-full px-3 mb-2 md:mb-0">
    <label
      className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
      htmlFor="grid-password"
    >
      Email Address
    </label>
    <input
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      id="grid-password"
      type="email"
      name="email"
      value={teacherInfo.email}
      onChange={handleChange}
      placeholder={currentTeacher.email}
    />
  </div>
</div>

<div className="flex flex-wrap mb-4">
  <div className="w-full px-3 mb-2 md:mb-0">
    <label
      className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
      htmlFor="grid-password"
    >
      Password
    </label>
    <input
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      id="grid-password"
      type="password"
      name="password"
      value={teacherInfo.password}
      onChange={handleChange}
      placeholder={currentTeacher.password}
    />
  </div>
</div>

          
          <div>
            <button
              type="submit"
              className="text-white bg-[#7c38cd] hover:bg-[#8244cf] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTeachersDash;
