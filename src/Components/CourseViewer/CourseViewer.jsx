import React from "react";
import { useParams } from "react-router-dom";
import "./CourseViewer.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

const CourseViewer = () => {
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

	// ESTADO CON LOS TODOS LOS CURSOS
	const [courses, setAllCourses] = useState([]);

	// ESTADO CON CURSOS FILTRADOS POR CATEGORIA (RELACIONADOS)
	const [relatedVideo, setRelatedVideo] = useState([]);

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
		if (courseData.cathegory === "Programacion") {
			const video = courses.filter(
				(video) => video.cathegory !== "Idioma"
			);
			setRelatedVideo(video);
			console.log(relatedVideo);
		} else if (courseData.cathegory === "Idioma") {
			const video = courses.filter(
				(video) => video.cathegory !== "Programacion"
			);
			setRelatedVideo(video);
			console.log(relatedVideo);
		}
	}, [courseData, courses]);

	// LIMPIEZA DEL ESTADO RELATEDVIDEO

	const clean = () => {
		setAllCourses([]);
	};

	// USO DE HOOKS
	const { id } = useParams();

	// RESPUESTA API DE CURSO CUANDO SE CARGUE EL COMPONENTE

	useEffect(() => {
		const course = async () => {
			try {
				await axios
					.get(`https://talent-forge-data.cyclic.app/courses/${id}`)
					.then((response) => {
						setCourseData(response.data);
						// console.log(response.data);
					});
			} catch (error) {
				console.log(`Hay error ${error.message}`);
			}
		};

		course();

		// return clean
	}, [id]);

	// ID DEL VIDEO
	const videoUrl = courseData.link;

	const getDriveVideoId = (url) => {
		const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)\//);
		return match && match[1] ? match[1] : null;
	};

	const driveVideoId = getDriveVideoId(videoUrl);

	return (
		<div className="course-viewer">
			<div className="course-viewer-video">
				{/* VIDEO  */}
				<div className="video-container">
					<iframe
						src={`https://drive.google.com/file/d/${driveVideoId}/preview`}
						title={courseData.title}
						allow="autoplay; encrypted-media"
						allowFullScreen
					></iframe>
				</div>
				{/* ---- */}

				{/* INFORMACION DEL CURSO */}
				<div className="course-info">
					<h2 className="video-title">{courseData.title}</h2>
					<channel className="instructor-details">
						<img
							src={courseData.image}
							alt="Course Thumbnail"
							className="video-image"
						/>
						<div className="video-instructor">
							{courseData.teacher}
						</div>
					</channel>
					<description className="video-description">
						{courseData.description}
					</description>
					<details className="course-details">
						<p>Rating: {courseData.rating}</p>
						<p>Duration: {courseData.duration}</p>
						<p>Price: {courseData.price}</p>
					</details>
				</div>
				{/* ------- */}
			</div>

			{/* VIDEOS RELACIONADOS */}

			<div className="course-viewer-related-videos">
      <h3>Related Videos:</h3>
				<div className="related-video-container">
					{relatedVideo.map((video) => (
						<Link to={`/view/${video._id}`}>
            <div key={video.id}>
							<h4>{video.title}</h4>
							<img
								className="related-video"
								src={video.image}
								alt=""
							/>
						</div></Link>
					))}
				</div>
			</div>

			{/* -------- */}
		</div>
	);
};

export default CourseViewer;
