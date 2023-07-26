import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { FaStar } from "react-icons/fa";
import "./CourseDetail.css";

const CourseDetail = () => {
  const navigate = useNavigate();

  // VALIDACION DE USUARIO
  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    const username = localStorage.getItem("username");

    if (!loggedUser && !username) {
      navigate("/login");
    }
  }, [navigate]);
  // -----------------------------

  const { id } = useParams();
  const [detailInfo, setDetailInfo] = useState({});
  const [teacherInfo, setTeacherInfo] = useState({});
  const [gettingCourse, setGettingCourse] = useState(true); // Estado para controlar si se está obteniendo la información del curso
  const [ratingLength, setRatingLength] = useState([]);
  const [showRating, setShowRating] = useState(null);
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

        const ratingsArray = data.interactions?.ratings || [];
        setRatingLength(ratingsArray);

        if (ratingsArray.length > 0) {
          // Calcular el promedio del rating
          const ratingTotal = ratingsArray.reduce(
            (total, userSentRating) => total + userSentRating.rating,
            0
          );
          const ratingAverage = ratingTotal / ratingsArray.length;
          const roundedRating = Math.round(ratingAverage);
          setShowRating(roundedRating);
        } else {
          setShowRating("No ratings yet");
        }
      } catch (error) {
        setError("Error fetching course information.");
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
              className="w-full h-auto object-cover border-2 border-[#7c38cd] detailImage"
            />
            <h1 className="text-3xl font-bold text-[#7c38cd] py-1 detailTitle">
              {title}
            </h1>
            <p className="text-xl py-1 detailDescription">{description}</p>
            <div className="flex items-center mt-2">
              <div className="flex">
                {ratingLength && ratingLength.length > 0 ? (
                  ratingLength.map((userSentRating, index) => (
                    <label key={index}>
                      <input
                        className="radio"
                        type="radio"
                        name="rating"
                        value={index + 1}
                      />
                      <FaStar
                        color={
                          index < showRating ? "#ffc107" : "#e7e7e7"
                        }
                        className="description-stars"
                        size={20}
                      />
                    </label>
                  ))
                ) : (
                  <span className="ratings-amount">No reviews yet</span>
                )}
              </div>
              {ratingLength.length > 0 && (
                <p className="ml-xl text-lg">{`Rating: ${showRating} (${ratingLength.length})`}</p>
              )}
            </div>
            <NavLink
              className="text-xl mt-2 py-1 text underline decoration-1 ownedByDetail"
              to={`/teacher/${teacherInfo?._id || "64a637218f0d799012be25b2"}`}
            >
              Owned by: {teacherName}
            </NavLink>
            <p className="text-xl mt-2 py-1 detailDuration">{`Duration: ${duration}`}</p>
            <p className="text-3xl font-bold text-[#7c38cd] py-1 detailPrice">{`Price: $${prize} USD`}</p>
          </div>
          <NavLink
            to={`/view/${id}`}
            className="block bg-[#7c38cd] text-white py-2 px-4 mt-4 detailButton"
          >
            Start the course!
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;

