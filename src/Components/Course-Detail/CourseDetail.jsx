import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const CourseDetail = () => {

  const navigate = useNavigate();
	  // VALIDACION DE USUARIO
	  useEffect(() => {

		if (localStorage.getItem("loggedUser")) return 
		else if (localStorage.getItem("username")) return 
		else if (!localStorage.getItem("username")) navigate('/login')
		else if (!localStorage.getItem("loggedUser")) navigate('/login')
	  }, [navigate]); 
	  // -----------------------------

  const { id } = useParams();
  const [detailInfo, setDetailInfo] = useState({});
  const [teacherInfo, setTeacherInfo] = useState({});
  const [gettingCourse, setGettingCourse] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course details
  useEffect(() => {
    const getDetail = async () => {
      try {
        const { data } = await axios.get(
          `https://talent-forge-data.cyclic.app/courses/${id}`
        );
        setDetailInfo(data);
        setGettingCourse(false);
      } catch (error) {
        setError("Error fetching course details.");
      }
    };
    getDetail();
  }, [id]);

  // Fetch teacher information
  useEffect(() => {
    const getTeacher = async () => {
      if (detailInfo.teacher) {
        try {
          const { data } = await axios.get(
            `https://talent-forge-data.cyclic.app/teacher/name/${detailInfo.teacher}`
          );
          if (data && data.length > 0) {
            setTeacherInfo(data[0]);
          }
        } catch (error) {
          setError("Error fetching teacher information.");
        }
      }
    };
    getTeacher();
  }, [detailInfo.teacher]);

  if (gettingCourse) {
    return <Loading />;
  }

  const {
    title,
    image,
    rating,
    duration,
    description,
    cathegory,
    theme,
    prize,
  } = detailInfo;
  const teacherName = teacherInfo?.name || "Community";

  return (
    <div className="flex justify-center mt-8 text-left py-1 mb-5">
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="max-w-2xl w-full p-4 bg-white rounded-md shadow-lg">
          <div className="my-4">
            <img
              src={image}
              alt=""
              className="w-full h-auto object-cover border-2 border-[#7c38cd]"
            />
            <h1 className="text-3xl font-bold text-[#7c38cd] py-1">{title}</h1>
            <p className="text-xl py-1">{description}</p>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    className={`w-6 h-6 ${
                      index < Math.round(rating)
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0l2.175 6.63h6.85l-5.52 4.01 2.176 6.64L10 13.25l-5.682 4.03 2.177-6.64-5.52-4.01h6.85L10 0z"
                    />
                  </svg>
                ))}
              </div>
              <p className="ml-xl text-lg">{`${rating}`}</p>
            </div>
            <NavLink
              className="text-xl mt-2 py-1 text underline decoration-1"
              to={`/teacher/${teacherInfo?._id || "64a637218f0d799012be25b2"}`}
            >
              Owned by: {teacherName}
            </NavLink>
            <p className="text-xl mt-2 py-1">{`Duration: ${duration}`}</p>
            <p className="text-3xl font-bold text-[#7c38cd] py-1">{`Price: $${prize} USD`}</p>
          </div>
          <NavLink
            to={`/view/${id}`}
            className="block bg-[#7c38cd] text-white py-2 px-4 mt-4"
          >
            Start the course!
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
