import { useParams } from "react-router";
import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const EditStudent = () => {
  const navigate = useNavigate();
  // VALIDACION DE USUARIO
  useEffect(() => {
    if (localStorage.getItem("loggedUser")) return;
    else if (localStorage.getItem("username")) return;
    else if (!localStorage.getItem("username")) navigate("/login");
    else if (!localStorage.getItem("loggedUser")) navigate("/login");
  }, [navigate]);
  // -----------------------------

  const [currentUser, setCurrentUser] = useState({});
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    country: "",
    dateOfBirth: "",
    password: "",
    description: "",
    profileImage: "",
  });

  const { id } = useParams();

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSubmit = async (event) => {
    const teacherEdited = {
      fullName: userInfo.fullName === "" ? currentUser.fullName : userInfo.fullName,
      email: userInfo.email === "" ? currentUser.email : userInfo.email,
      country: userInfo.country === "" ? currentUser.country : userInfo.country,
      dateOfBirth: userInfo.dateOfBirth === "" ? currentUser.dateOfBirth : userInfo.dateOfBirth,
      password: userInfo.password === "" ? currentUser.password : userInfo.password,
      description: userInfo.description === "" ? currentUser.description : userInfo.description,
      profileImage: userInfo.profileImage === "" ? currentUser.profileImage : userInfo.profileImage,
    };
    event.preventDefault();
    axios.put(
      `https://talent-forge-data.cyclic.app/user/edit/${id}`,
      teacherEdited
    );
    setUserInfo({
      name: "",
      email: "",
      country: "",
      dateOfBirth: "",
      password: "",
      description: "",
      profileImage: "",
    });
    navigate('/profile')
  };

  const handleChange = (event) => {
    console.log(event)
    const { name, value } = event.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value ?? currentUser[name],
    }));
  };

  useEffect(() => {
    const getCurrentTeacher = async () => {
      const { data } = await axios.get(
        `https://talent-forge-data.cyclic.app/user/${id}`
      );
      setCurrentUser(data);
    };
    getCurrentTeacher();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-start w-full mx-auto md:w-2/3 py-10 text-left">
      <div className="w-full md:w-1/3 p-4">
        <img
          src={currentUser.profileImage}
          alt=""
          className="w-300 h-300 mb-2 mx-auto md:mx-0"
        />
        <input
          className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="grid-profile-image"
          type="text"
          name="profileImage"
          value={userInfo.profileImage}
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
                name="fullName"
                value={userInfo.name}
                onChange={handleChange}
                placeholder={currentUser.fullName}
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
      value={userInfo.dateOfBirth}
      onChange={handleChange}
      placeholder={currentUser.dateOfBirth}
    />
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
      value={userInfo.description}
      onChange={handleChange}
      placeholder={currentUser.description}
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
      value={userInfo.email}
      onChange={handleChange}
      placeholder={currentUser.email}
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
      value={userInfo.password}
      onChange={handleChange}
      placeholder={currentUser.password}
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

export default EditStudent;
