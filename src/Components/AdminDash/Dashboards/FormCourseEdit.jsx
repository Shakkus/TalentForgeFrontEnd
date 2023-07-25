import { useParams } from "react-router";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const FormCourseEdit = () => {
  const navigate = useNavigate();

  // VALIDATION OF USER
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

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [selectedImage, setSelectedImage] = useState("");

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      { cloudName: "dal385dkc", uploadPreset: "q3fewzvu" },
      function (error, result) {
        if (result && result.event === "success") {
          const imageUrl = result.info.secure_url;
          setSelectedImage(imageUrl);
        }
      }
    );
  }, []);

  const [currentCourse, setCurrentCourse] = useState({});
  const [courseInfo, setCourseInfo] = useState({
    title: "",
    category: "",
    theme: "",
    link: "",
    teacher: "",
    description: "",
    price: "",
    duration: "",
    image: "",
  });

  const { id } = useParams();

  const handleSubmit = async (event) => {
    const courseEdited = {
      title: courseInfo.title === "" ? currentCourse.title : courseInfo.title,
      category:
        courseInfo.category === ""
          ? currentCourse.category
          : courseInfo.category,
      theme: courseInfo.theme === "" ? currentCourse.theme : courseInfo.theme,
      link: courseInfo.link === "" ? currentCourse.link : courseInfo.link,
      teacher:
        courseInfo.teacher === "" ? currentCourse.teacher : courseInfo.teacher,
      description:
        courseInfo.description === ""
          ? currentCourse.description
          : courseInfo.description,
      price: courseInfo.price === "" ? currentCourse.price : courseInfo.price,
      duration:
        courseInfo.duration === ""
          ? currentCourse.duration
          : courseInfo.duration,
      image: courseInfo.image === "" ? currentCourse.image : courseInfo.image,
    };
    event.preventDefault();
    axios.put(
      `https://talent-forge-data.cyclic.app/courses/edit/${id}`,
      courseEdited
    );
    setCourseInfo({
      title: "",
      category: "",
      theme: "",
      link: "",
      teacher: "",
      description: "",
      price: "",
      duration: "",
      image: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourseInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value ?? currentCourse[name],
    }));
  };

  useEffect(() => {
    const getCurrentCourse = async () => {
      const { data } = await axios.get(
        `https://talent-forge-data.cyclic.app/courses/${id}`
      );
      setCurrentCourse(data);
    };
    getCurrentCourse();
  }, [id]);

  return (
    <div className="w-full mx-auto md:w-2/3 py-20 px-4 md:px-0">
      <button
        type="button"
        onClick={handleGoBack}
        className="text-white bg-[#7c38cd] hover:bg-[#8244cf] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Go Back
      </button>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Image Section */}
          <div className="flex flex-col items-center mb-4 md:w-1/3">
            <img
              src={currentCourse.image}
              alt=""
              className="w-300 h-300 mb-2"
            />
            <input
              id="grid-profile-image"
              type="text"
              name="image"
              value={courseInfo.image}
              onChange={handleChange}
              placeholder="Change image URL"
              className="px-2 py-1 border border-gray-300 rounded"
            />
          </div>

          {/* Inputs Section */}
          <div className="flex flex-col flex-grow">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={courseInfo.title}
                onChange={handleChange}
                placeholder={currentCourse.title}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="teacher"
                className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
              >
                Teacher:
              </label>
              <input
                type="text"
                id="teacher"
                name="teacher"
                value={courseInfo.teacher}
                onChange={handleChange}
                placeholder={currentCourse.teacher}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
              >
                Category:
              </label>
              <select
                id="category"
                name="category"
                value={courseInfo.category}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select a category</option>
                <option value="programming">Programming</option>
                <option value="languages">Languages</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="theme"
                className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
              >
                Theme:
              </label>
              <input
                type="text"
                id="theme"
                name="theme"
                value={courseInfo.theme}
                onChange={handleChange}
                placeholder={currentCourse.theme}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
                >
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={courseInfo.prize}
                  onChange={handleChange}
                  placeholder={currentCourse.prize}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="duration"
                  className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2 "
                >
                  Duration:
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={courseInfo.duration}
                  onChange={handleChange}
                  placeholder={currentCourse.duration}
                  className="w-full px-2 py-1 border border-gray-300 rounded w-1/2"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={courseInfo.description}
                onChange={handleChange}
                placeholder={currentCourse.description}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-40 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="link"
                className="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2"
              >
                Link:
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={courseInfo.link}
                onChange={handleChange}
                placeholder={currentCourse.link}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="mx-auto text-white bg-[#7c38cd] hover:bg-[#8244cf] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                EDIT
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCourseEdit;
