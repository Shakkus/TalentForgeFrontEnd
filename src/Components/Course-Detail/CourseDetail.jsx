import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./CourseDetail.css";
import Loading from "../../Loading/Loading";

const CourseDetail = () => {
  const { id } = useParams();
  const [detailInfo, setDetailInfo] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState([]);
  const [gettingCourse, setGettingCourse] = useState(true); // Estado para controlar si se está obteniendo la información del curso

  const getTeacher = async () => {
    try {
      const { data } = await axios.get(
        `https://talent-forge-data.cyclic.app/teacher/name/${detailInfo.teacher}`
      );
      if (data) setTeacherInfo(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getDetail = async () => {
      try {
        const { data } = await axios.get(
          `https://talent-forge-data.cyclic.app/courses/${id}`
        );
        setDetailInfo(data);
        setGettingCourse(false);
      } catch (error) {
        console.log(error);
      }
    };

    getDetail();
  }, []);

  useEffect(() => {
    if (detailInfo.teacher) {
      getTeacher();
    }
  }, [detailInfo]);

  const flag = () => {
    if (teacherInfo?.country === "Colombia") {
      return "Colombia 🇨🇴";
    }
    if (teacherInfo?.country === "Argentina") {
      return "Argentina 🇦🇷";
    }
  };

  if (gettingCourse) {
    return <Loading />;
  }

  return (
    <div className="courseDetail">
      <div className="courseDetailContainer">
        <h1 className="detailInfo">INFORMACION DEL CURSO</h1>
        <h2 className="detailTitle">{detailInfo.title}</h2>
        <div className="courseInfo">
          <div className="detailInfo1">
            <img className="detailImage" src={detailInfo.image} alt="" />
            <p className="detailRating">
              {detailInfo.rating}⭐ {detailInfo.duration} ⏱
            </p>
            <h2 className="detailDescription">{detailInfo.description}</h2>
          </div>

          <div className="detailInfo2">
            <h2 className="detailCathegory">
              Category: {detailInfo.cathegory}
            </h2>
            <h2 className="detailTheme">Theme: {detailInfo.theme}</h2>
            <NavLink
              to={`/view/${id}`}
              style={{ textDecoration: "none" }}
              className="w-5 bg-purple-600 p-3 rounded"
            >
              <button className="text-white m-3">Comenzar con el curso!</button>
            </NavLink>
            <p className="detailPrize">
              ${detailInfo.prize} <b style={{ color: "green" }}>USD</b>
            </p>
          </div>
        </div>
        <div className="teacherInfoContainer">
          {/* <h1 className="detailTeacherTitle">INFORMACION DEL PROFESOR</h1> */}
          <div className="teacherInfo">
            <div className="teacherInfo2">
              <h1 className="name-teacher">
                {" "}
                {teacherInfo?.name ? teacherInfo.name : "Community"}
              </h1>
              <img
                className="detailTeacherImage"
                src={
                  teacherInfo?.profileImage
                    ? teacherInfo.profileImage
                    : "https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec"
                }
                alt=""
              />
              {teacherInfo?.name && (
                <NavLink
                  style={{ textDecoration: "none" }}
                  className="detailTeacherName"
                  to={`/teacher/${
                    teacherInfo?._id ? teacherInfo._id : "64a637218f0d799012be25b2"
                  }`}
                >
                  {" "}
                  {teacherInfo?.name && "View profile"}
                </NavLink>
              )}
              <h2 className="detailTeacherCountry mt-4">{flag()}</h2>
            </div>
            <div className="teacherInfoDescriptionContainer">
              <h2 className="detailTeacherDescription">
                {teacherInfo?.description
                  ? teacherInfo.description
                  : "This course was created by the talent forge community"}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
