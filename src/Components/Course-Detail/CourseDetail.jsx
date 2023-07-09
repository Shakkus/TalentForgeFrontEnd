import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./CourseDetail.css";

const CourseDetail = () => {
  const { id } = useParams();
  const [detailInfo, setDetailInfo] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState([]);

  const getTeacher = async () => {
    const { data } = await axios.get(
      `https://talent-forge-data.cyclic.app/teacher/name/${detailInfo.teacher}`
    );
    setTeacherInfo(data[0]);
    console.log(data);
  };

  const getDetail = async () => {
    const { data } = await axios.get(
      `https://talent-forge-data.cyclic.app/courses/${id}`
    );
    setDetailInfo(data);
  };

  useEffect(() => {
    getDetail();
  }, []);

  useEffect(() => {
    if (detailInfo.teacher) {
      getTeacher();
    }
  }, [detailInfo]);

  const flag = () => {
    if (teacherInfo.country === "Colombia") {
      return "Colombia 🇨🇴";
    }
    if (teacherInfo.country === "Argentina") {
      return "Argentina 🇦🇷";
    }
  };

  const chamba = () => {
    if(teacherInfo.name === "Gian Ruiz") return "Chambeador"
    else return teacherInfo.name
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
            <NavLink to={detailInfo.link} style={{ textDecoration: "none" }} className="w-5 bg-purple-600 p-3 rounded">
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
              <img
                className="detailTeacherImage"
                src={teacherInfo.profileImage}
                alt=""
              />
              <NavLink
                style={{ textDecoration: "none" }}
                className="detailTeacherName"
                to={`/teacher/${teacherInfo._id}`}>
                {chamba()}
              </NavLink>
              <h2 className="detailTeacherCountry mt-4">{flag()}</h2>
            </div>
            <div className="teacherInfoDescriptionContainer">
              <h2 className="detailTeacherDescription">
                {teacherInfo.description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
