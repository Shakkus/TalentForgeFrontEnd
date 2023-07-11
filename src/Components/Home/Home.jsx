import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseFilter from "./Filter";
import "./Home.css";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	const [courses, setCourses] = useState([]);
	const [filteredCourses, setFilteredCourses] = useState([]);

	const getCourses = async () => {
		try {
			const { data } = await axios.get(
				"https://talent-forge-data.cyclic.app/courses"
			);
			setCourses(data);
			setFilteredCourses(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCourses();
	}, []);

	const handleFilter = (filteredCourses) => {
		setFilteredCourses(filteredCourses);
	};

	// VERIFICACION SESION INICIADA

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");
		if (!loggedUser) navigate("/login");
	}, []);

	// --------------

	return (
		<div className="home">
			<CourseFilter courses={courses} onFilter={handleFilter} />
			<div>
				{filteredCourses.map((course) => (
					<div key={course._id} className="homeCourse">
						<img src={course.image} alt="imagenDeCurso" />
						<div className="course-duration">
							{" "}
							{course.duration}{" "}
						</div>
						<div className="infoCourse">
							<h2 className="course-title">{course.title}</h2>
							<p className="course-desc">{course.description}</p>
							<p className="course-prize">{course.prize}</p>
						</div>

						<a className="courseBtn">
							{" "}
							<NavLink
								to={`http://localhost:3000/course/${course._id}`}
							>
								{" "}
								View Course{" "}
							</NavLink>{" "}
						</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
