import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
import { useState } from "react";
import axios from "axios";
import { validate } from "./validate";
import "./Register.css"

const Form = () => {
  const navigate = useNavigate();

  const { logginWhitGoogle, logginWhitTwitter } = useAuth();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    email: "",
    country: "",
    dateOfBirth: "",
    password: "",
    confirmPass: "",
    registerWith: ""
  });

  const countrys = [
    "Argentina",
    "Chile",
    "Brasil",
    "Venezuela",
    "Bolivia",
    "Perú",
    "Colombia",
    "Ecuador",
    "México",
    "El Salvador",
    "Honduras",
    "España",
    "Panamá",
    "Cuba",
    "Costa Rica",
    "Uruguay",
    "Estados Unidos",
    "España",
    "Alemania",
    "Reino Unido",
    "Alemania",
    "Francia",
    "Italia",
    "Canadá",
    "Rusia"
  ];

  

  const registerInfoGetter = async () => {
      const logInfo = {
        username: input.username,
        password: input.password,
      };
      const { data } = await axios.post('https://talent-forge-data.cyclic.app/login/', logInfo);
      localStorage.setItem('registerEmail', data.email);
  }

  const handleSubmit = async (event) => {
  try {
    event.preventDefault();
    const formErrors = validate(input);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    setInput({
      fullName: "",
      username: "",
      email: "",
      country: "",
      dateOfBirth: "",
      password: "",
      confirmPass: "",
      registerWith: ""
    });
  
    // Realizar la solicitud POST para registrar al usuario
    await axios.post("https://talent-forge-data.cyclic.app/user/", input);
  
    // Obtener el correo electrónico y guardarlo en el almacenamiento local
    await registerInfoGetter();
  
    // Navegar a la página de registro exitoso
    navigate("/welcome");
  } catch (error) {
    console.log(error.message);
  }
  };  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
    setErrors({
      ...errors,
      [name]: validate({ ...input, [name]: value })[name]
    });
    console.log(event)
  };

  const handleAuthGoogle = async () => {
    try {
      await logginWhitGoogle();
      navigate("/welcome");
    } catch (error) {
      setErrors(error.code);
      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        setErrors("Login cancelled");
      }
    }
  };

  const handleAuthTwitter = async () => {
    try {
      await logginWhitTwitter();
      navigate("/welcome");
    } catch (error) {
      setErrors(error.code);
      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        setErrors("Login cancelled");
      }
    }
  };

  return (
    <div id="form-register">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-[#7c38cd]">
          Register account with:
        </h2>
        <div className="flex justify-center space-x-10">
          <img
            src="image 109.png"
            alt="Google"
            className="h-8 cursor-pointer icon"
            onClick={handleAuthGoogle}
          />
          <img
            src="image 88.png"
            alt="Twitter"
            className="h-8 cursor-pointer icon" 
            onClick={handleAuthTwitter}
          />
          <img
            src="image 87.png"
            alt="Gmail"
            className="h-8 cursor-pointer icon"
            onClick={handleAuthGoogle}
          />
        </div>
      </div>
      <form class=" max-w-lg" onSubmit={handleSubmit}>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Full Name
            </label>
            <input
              className="input-form bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="grid-first-name"
              type="text"
              name="fullName"
              value={input.fullName}
              onChange={handleChange}
              placeholder="Jane Monrow"
            />
            {errors.fullName && (
              <p class="text-red-500 text-xs italic">{errors.fullName}</p>
            )}
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
              for="grid-last-name"
            >
              username
            </label>
            <input
              className="input-form bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="grid-last-name"
              type="text"
              name="username"
              value={input.username}
              onChange={handleChange}
              placeholder="Doe"
            />
            {errors.username && (
              <p class="text-red-500 text-xs italic">{errors.username}</p>
            )}
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
              for="grid-password"
            >
              email adress
            </label>
            <input
              className="input-form bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="grid-password"
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="example@example.com"
            />
            {errors.email && (
              <p class="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
              for="grid-password"
            >
              Password
            </label>
            <input
              className="input-form bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="grid-password"
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="******************"
            />
            {errors.password && (
              <p class="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
              for="grid-password"
            >
              repeat Password
            </label>
            <input
              className="input-form bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="grid-password"
              type="password"
              name="confirmPass"
              value={input.confirmPass}
              onChange={handleChange}
              placeholder="******************"
            />
            {errors.confirmPass && (
              <p class="text-red-500 text-xs italic">{errors.confirmPass}</p>
            )}
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
              for="grid-city"
            >
              birthdate
            </label>
            <input
              className="input-form bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="grid-city"
              type="text"
              name="dateOfBirth"
              value={input.dateOfBirth}
              onChange={handleChange}
              placeholder="dd-mm-yyyy"
            />
            {errors.dateOfBirth && (
              <p class="text-red-500 text-xs italic">{errors.dateOfBirth}</p>
            )}
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
              for="grid-state"
            >
              State
            </label>
            <div class="relative">
              <select
                className="input-form bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"
                id="grid-state"
                name="country"
                value={input.country}
                onChange={handleChange}
              >
                <option value="">SELECT</option>
                {countrys.map((country) => (
                  <option className="optionCountry" value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p class="text-red-500 text-xs italic">{errors.country}</p>
              )}
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div>
        <button
          type="submit"
          className="input-form text-white bg-[#7c38cd] hover:bg-[#8244cf] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
        </div>
        
      </form>
    </div>
  );
};

export default Form;
