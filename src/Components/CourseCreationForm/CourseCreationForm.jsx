import React, { useState, useEffect, useRef } from "react";
import { validate } from "./validation";
import { useNavigate } from "react-router-dom";
import { FaWindowClose } from 'react-icons/fa'
import axios from "axios";
import "./CourseCreation.css";

const CourseForm = () => {

  const navigate = useNavigate();

  // CONFIG PARA SUBIR FOTOS A CLOUDINARY

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const [selectedImage, setSelectedImage] = useState("");

  // ---------------

  // POP UPS

  // EXITO
  const[successPopUp, setSuccessPopUp] = useState(false)

  // ERROR
  const[errorPopUp, setErrorPopUp] = useState(false)
  // -------

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    title: "",
    cathegory: "",
    theme: "",
    link: "",
    teacher: "",
    description: "",
    image: "",
    prize: "",
    duration: "",
    rating: "",
  });

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dal385dkc",
        uploadPreset: "q3fewzvu",
      },
      function (error, result) {
        if (result && result.event === "success") {
          const imageUrl = result.info.secure_url;
          setSelectedImage(imageUrl);
        }
      }
    );
  }, []);

  

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const formErrors = validate(input);
  //   if (Object.keys(formErrors).length > 0) {
  //     setErrors(formErrors);
  //     return;
  //   }
    
  //   console.log(input, selectedImage);
  //   const inputData = {
  //     ...input,
  //     image: selectedImage,
  //   };

  //     await axios.post(
  //       "https://talent-forge-data.cyclic.app/courses/",
  //       inputData
  //     );
  //     setInput({
  //       title: "",
  //       cathegory: "",
  //       theme: "",
  //       link: "",
  //       teacher: "",
  //       description: "",
  //       prize: "",
  //       duration: "",
  //       rating: "",
  //     });
  //   }




  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validate(input);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    const inputData = {
      ...input,
      image: selectedImage,
    };
    
    try {
      const response = await axios.post(
        "https://talent-forge-data.cyclic.app/courses/",
        inputData
        );
        
      if (!response) {
        console.log('no anda');
        setSuccessPopUp(true);
      } else {
        setErrorPopUp(true);
      }
    } catch (error) {
      setErrorPopUp(true);
      console.log(error);
    }

    setInput({
      title: "",
      cathegory: "",
      theme: "",
      link: "",
      teacher: "",
      description: "",
      prize: "",
      duration: "",
      rating: "",
    });
    
    setSelectedImage('')
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "theme") {
      const themeArray = value.split(",").map((item) => item.trim());
      setInput({
        ...input,
        [name]: themeArray,
        image: selectedImage,
      });
    } else {
      setInput({ ...input, [name]: value });
    }

    setErrors({
      ...errors,
      [name]: validate({ ...input, [name]: value })[name],
    });
  };

  // VERIFICACION SESION INICIADA

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    const userId = localStorage.getItem("userId");
    if (!loggedUser && !userId) navigate("/login");
    // setSuccessPopUp(false);
    // setErrorPopUp(false);
    
    return () => {
      setSuccessPopUp(false);
      setErrorPopUp(false);
    };
}, []);

  // --------------

  return (
    <div class="course-form-container">
      {successPopUp && (
        <div className="popup-container">
          <div className="popup">
            <h5>Course created successfully</h5>
            <button onClick={() => setSuccessPopUp(false)}><FaWindowClose size={20} /></button>
          </div>
        </div>
      )}
      {errorPopUp && (
        <div className="popup-container">
          <div className="popup">
            <h5>There was an error in the creation of the course, try again</h5>
            <button onClick={() => setErrorPopUp(false)}><FaWindowClose size={20} /></button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <div class="flex flex-wrap mb-6">
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
                for="title"
              >
                Title:
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                id="title"
                name="title"
                value={input.title}
                onChange={handleChange}
              />
              {errors.title && (
                <span class="text-red-500"> {errors.title}</span>
              )}
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
                for="teacher"
              >
                Teacher:
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                id="teacher"
                name="teacher"
                value={input.teacher}
                onChange={handleChange}
              />
              {errors.teacher && (
                <span class="text-red-500"> {errors.teacher}</span>
              )}
            </div>
          </div>
          <div class="flex flex-wrap mb-6">
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
                for="cathegory"
              >
                Category:
              </label>
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id="cathegory"
                name="cathegory"
                value={input.cathegory}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="programming">Programming</option>
                <option value="languages">Languages</option>
              </select>
              {errors.cathegory && (
                <span class="text-red-500"> {errors.cathegory}</span>
              )}
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
                for="theme"
              >
                Theme:
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                id="theme"
                name="theme"
                value={input.theme}
                onChange={handleChange}
              />
              {errors.theme && (
                <span class="text-red-500"> {errors.theme}</span>
              )}
            </div>
          </div>
          <div class="flex flex-wrap mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
                for="description"
              >
                Description:
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                id="description"
                name="description"
                value={input.description}
                onChange={handleChange}
              />
              {errors.tion && (
                <span descripclass="text-red-500"> {errors.description}</span>
              )}
            </div>
          </div>
          <div class="flex flex-wrap mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
                for="link"
              >
                Link:
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                id="link"
                name="link"
                value={input.link}
                onChange={handleChange}
              />
              {errors.link && <span class="text-red-500"> {errors.link}</span>}
            </div>
          </div>
          <div class="flex flex-wrap mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
                for="image"
              >
                Image:
              </label>
              <button
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="button"
                name="image"
                onClick={() => widgetRef.current.open()}
              >
                Upload Image
              </button>
              {!selectedImage && (
                <span class="text-red-500"> {errors.image}</span>
              )}
              {selectedImage && (
                <img src={selectedImage} alt="" class="img-upload" />
              )}
            </div>
          </div>
          <div class="flex flex-wrap mb-6">
            {/* <div class="w-full md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
                for="rating"
              >
                Rating:
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="number"
                id="rating"
                name="rating"
                value={input.rating}
                onChange={handleChange}
              />
              {errors.rating && (
                <span class="text-red-500"> {errors.rating}</span>
              )}
            </div> */}
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
                for="prize"
              >
                Price:
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="number"
                id="prize"
                name="prize"
                value={input.prize}
                onChange={handleChange}
              />
              {errors.prize && (
                <span class="text-red-500"> {errors.prize}</span>
              )}
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
                for="duration"
              >
                Duration:
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                id="duration"
                name="duration"
                value={input.duration}
                onChange={handleChange}
              />
              {errors.duration && (
                <span class="text-red-500"> {errors.duration}</span>
              )}
            </div>
          </div>
        </div>
        <div class="btn-box">
          <button
            type="submit"
            class="text-white bg-[#7c38cd] hover:bg-[#8244cf] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={
              !input.title ||
              !input.cathegory ||
              !input.theme ||
              !input.link ||
              !input.teacher ||
              !input.description ||
              !input.rating ||
              !input.prize ||
              !input.duration
            }
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
