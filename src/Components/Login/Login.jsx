import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/authContext.js";
import axios from "axios";
import "./Login.css"

const Login = () => {
  const navigate = useNavigate();
  const { logginWhitGoogle, logginWhitTwitter } = useAuth();
  const [errors, setErrors] = useState();
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const tokenInfoSetter = (data) => {
    localStorage.setItem('userAccountType', data.accountType);
    localStorage.setItem('userCountry', data.country);
    localStorage.setItem('userDate', data.dateOfBirth);
    localStorage.setItem('userDesc', data.description);
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('userfullName', data.fullName);
    localStorage.setItem('userImage', data.profileImage);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('username', data.username);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.post('https://talent-forge-data.cyclic.app/login/', loginInfo);
    tokenInfoSetter(data);
    setLoginInfo({
      username: "",
      password: "",
    });
    navigate("/home");
  };

  const handleAuthGoogle = async () => {
    try {
      await logginWhitGoogle();
      navigate("/home");
    } catch (error) {
      setErrors(error.code);
      if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
        setErrors("Login cancelled");
      }
    }
  };

  const handleAuthTwitter = async () => {
    try {
      await logginWhitTwitter();
      navigate("/home");
    } catch (error) {
      setErrors(error.code);
      if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
        setErrors("Login cancelled");
      }
    }
  };

  return (
    <div id="form">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-[#7c38cd]">
          Sign in with:
        </h2>
        <div className="flex justify-center space-x-4">
          <img
            src="image 109.png"
            alt="Google"
            className="h-8 cursor-pointer"
            onClick={handleAuthGoogle}
          />
          <img
            src="image 88.png"
            alt="Twitter"
            className="h-8 cursor-pointer"
            onClick={handleAuthTwitter}
          />
          <img
            src="image 87.png"
            alt="Gmail"
            className="h-8 cursor-pointer"
            onClick={handleAuthGoogle}
          />
        </div>
      </div>

      {errors && <p className="text-red-500">{errors}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-6" id="login">
          <label
            htmlFor="username"
            className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
          >
            Your username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            required
            name="username"
            value={loginInfo.username}
            onChange={handleChange}
          />
          {errors && <p className="text-red-500">Campo requerido</p>}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
          >
            Your password
          </label>
          <input
            placeholder="Password123"
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
          />
          {errors && <p className="text-red-500">Campo requerido</p>}
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-[#7c38cd] dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-[#7c38cd] hover:bg-[#8244cf] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
