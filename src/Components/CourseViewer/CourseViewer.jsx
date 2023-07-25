import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseViewer.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Comments from "./Comments/Comments";
import Rating from "./Rating";
import { FaStar } from "react-icons/fa";

const CourseViewer = () => {
	const navigate = useNavigate();
	  // VALIDACION DE USUARIO
	  useEffect(() => {
		if (localStorage.getItem("loggedUser")) return 
		else if (localStorage.getItem("username")) return 
		else if (!localStorage.getItem("username")) navigate('/login')
		else if (!localStorage.getItem("loggedUser")) navigate('/login')
	  }, [navigate]); 
	  // -----------------------------


	// ESTADO CON LOS DATOS DEL CURSO TRAIDO DE API

	const [courseData, setCourseData] = useState({
		interactions: {
			comments: [],
			likes: 0,
			saves: 0,
		},
		_id: "",
		title: "",
		cathegory: "",
		theme: "",
		link: "",
		teacher: "",
		description: "",
		image: "",
	});
	// -----------------------------------------------

	// ESTADO CON LOS TODOS LOS CURSOS
	const [courses, setAllCourses] = useState([]);
	// -------------------------------

	// ESTADO CON CURSOS FILTRADOS POR CATEGORIA (RELACIONADOS)
	const [relatedVideo, setRelatedVideo] = useState([]);
	// --------------------------------------------------------

	// FILTRO DE VIDEOS RELACIONADOS DEPENDIENDO DE CATEGORIA

	useEffect(() => {
		const allCourses = async () => {
			try {
				const response = await axios.get(
					`https://talent-forge-data.cyclic.app/courses/`
				);
				setAllCourses(response.data);
			} catch (error) {
				console.log(`Hay error ${error.message}`);
			}
		};

		allCourses();
		return clean;
	}, []);

	useEffect(() => {
		if (courseData.cathegory === "Programming") {
			const video = courses.filter((video) => video.cathegory !== "languages");
			setRelatedVideo(video);
			// console.log(relatedVideo);
		} else if (courseData.cathegory === "languages") {
			const video = courses.filter(
				(video) => video.cathegory !== "Programming"
			);
			setRelatedVideo(video);
			// console.log(relatedVideo);
		}
	}, [courseData, courses]);

	// --------------------------------------------------

	// LIMPIEZA DEL ESTADO RELATEDVIDEO

	const clean = () => {
		setAllCourses([]);
	};
	// --------------------------------

	// USO DE HOOKS
	const { id } = useParams();
	// ------------

	const [isCoursePurchased, setIsCoursePurchased] = useState(false);

	useEffect(() => {
		const purchasedCourses = JSON.parse(localStorage.getItem("purchasedCourses")) || [];
		setIsCoursePurchased(purchasedCourses.includes(id));
	  }, [id]);

	// RESPUESTA API DE CURSO CUANDO SE CARGUE EL COMPONENTE
	const [ratingLength, setRatingLength] = useState([]);
	const [showRating, setShowRating] = useState(0);

	useEffect(() => {
		const course = async () => {
			try {
				const response = await axios.get(
					`https://talent-forge-data.cyclic.app/courses/${id}`
				);
				setCourseData(response.data);
				console.log(response.data.link);

				const ratingsArray = response.data.interactions.ratings;
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
				console.log(`Hay error ${error.message}`);
			}
		};

		course();
	}, [id]);

	// ------------------------------------------------------
	

	// VERIFICACION SESION INICIADA

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");
		const userId = localStorage.getItem("userId");
		if (!loggedUser && !userId) navigate("/login");
	}, []);

	// --------------

	return (
		<div className="course-viewer">
			<div className="course-viewer-video">
				{/* VIDEO  */}
				<div className="video-container">
					{courseData.link.includes("drive.google.com") ? (
						<iframe 
						title="INVALID VIDEO"
						sandbox="allow-same-origin allow-scripts"
						srcDoc="<span>INVALID VIDEO</span>"
						></iframe>
					) : (
						<iframe
							src={courseData.link}
							title={courseData.title}
							allow="autoplay; encrypted-media"
							allowFullScreen
						></iframe>
					)}
				</div>
				{/* ---- */}

				{/* INFORMACION DEL CURSO */}
				<div className="course-info">
					<h2 className="video-title">{courseData.title}</h2>
					<div className="interactions-container">
						<channel className="instructor-details">
							<img
								src={courseData.image}
								alt="Course Thumbnail"
								className="video-image"
							/>
							<div className="video-instructor">{courseData.teacher}</div>
						</channel>
						<div className="buttons-container">
							{isCoursePurchased && <Rating />}
							<button
								// type="button"
								className="button"
							>
								<svg
									width="30px"
									height="20px"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
										stroke="#ffffff"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</button>

							{/* ------------------ */}
							<button className="button">
								<svg
									width="30px"
									height="20px"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M8 14V4M8 14L4 14V4.00002L8 4M8 14L13.1956 20.0615C13.6886 20.6367 14.4642 20.884 15.1992 20.7002L15.2467 20.6883C16.5885 20.3529 17.1929 18.7894 16.4258 17.6387L14 14H18.5604C19.8225 14 20.7691 12.8454 20.5216 11.6078L19.3216 5.60779C19.1346 4.67294 18.3138 4.00002 17.3604 4.00002L8 4"
										stroke="#ffffff"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</button>
							{/* ------------------ */}
							<button className="button">
								<svg
									width="30px"
									height="20px"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M20 13V17.5C20 20.5577 16 20.5 12 20.5C8 20.5 4 20.5577 4 17.5V13M12 3L12 15M12 3L16 7M12 3L8 7"
										stroke="#ffffff"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</button>
						</div>
					</div>
					<description className="video-description"></description>
					<div className="course-details">
						<p>{courseData.description}</p>
						<p>
							<div className="rating-average-container">
								Rating:
								<div className="rating-average">
									{ratingLength &&
										[...Array(5)].map((star, index) => {
											const currentRating = index + 1;
											return (
												<label>
													<input
														className="radio"
														type="radio"
														name="rating"
														value={currentRating}
													/>
													<FaStar
														color={
															currentRating <= showRating
																? "#ffc107"
																: "#d7d7d7"
														}
														className="description-stars"
														size={20}
													/>
												</label>
											);
										})}
									{ratingLength ? (
										<span className="ratings-amount">
											({ratingLength.length} reviews)
										</span>
									) : (
										<span className="ratings-amount">No reviews yet</span>
									)}
								</div>
							</div>
						</p>
						<p>Duration: {courseData.duration}</p>
					</div>
				</div>
				<Comments />
				{/* ------- */}
			</div>

			{/* VIDEOS RELACIONADOS */}
			<div className="related-video-container">
				<h2>Related Videos</h2>
				{relatedVideo.map((video) => (
					<Link to={`/view/${video._id}`}>
						<div key={video.id} className="video-name-container">
							<img className="video" src={video.image} alt={video.title} />
							<h4>{video.title}</h4>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default CourseViewer;
