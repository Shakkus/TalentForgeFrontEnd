import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import "./CourseViewer.css";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { useParams } from "react-router";

const Rating = () => {
	const [newRating, setNewRating] = useState(null);
	const [hover, setHover] = useState(null);
	const [showStars, setShowStars] = useState(false);
	const { user } = useAuth();
	const { id } = useParams();
	const [userId, setUserId] = useState("");
	const localStorageUserId = localStorage.getItem("userId");
	const googleUserId = user?.uid;

	// VERIFICACION DE RATING

	useEffect(() => {
		const fetchData = async () => {
			try {
				const currentId = localStorageUserId || googleUserId;
				if (!currentId) {
					// Si no hay userId, no hacemos nada
					return;
				}

				setUserId(currentId);
				const response = await axios.get(
					`https://talent-forge-data.cyclic.app/courses/${id}`
				);

				const findUserId = response.data.interactions.ratings;
				console.log(findUserId);
				const userRating = findUserId.find(
					(rating) => rating.userId === currentId
				);
				if (userRating) {
					setNewRating(userRating.rating);
					setShowStars(true);
				} else {
					setShowStars(false);
				}
			} catch (error) {
				console.log("Error obtaining course data:", error);
			}
		};

		fetchData();
	}, [user, localStorageUserId, googleUserId, id]);

	const userInfo = {
		userId: userId,
		rating: newRating,
	};

	// ----------------------

	const handleRatingSubmit = async () => {
		try {
			setOpen(false)
			const response = await axios.put(
				`https://talent-forge-data.cyclic.app/courses/rating/${id}`,
				userInfo
			);
			if (response.status === 200) {
				setShowStars(true);
			}

			if (response.status === 500) {
				setShowStars(false);
			}
		} catch (error) {
			setShowStars(false);
		}

		setShowStars(!showStars);
		console.log(userInfo.rating);
	};

	const [open, setOpen] = useState(false);

	const openPopup = () => {
		setOpen(true);
	};

	const closePopup = () => {
		setOpen(false);
	};

	return (
		<div className="main-container">
			{showStars ? (
				<div className="fixed-rating">
					{[...Array(5)].map((star, index) => {
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
									color={currentRating <= newRating ? "#ffc107" : "#e7e7e7"}
									size={40}
								/>
							</label>
						);
					})}
				</div>
			) : (
				<button className="rating-button" onClick={() => setOpen(!open)}>
					RATE THIS VIDEO
				</button>
			)}
			{open && (
				<div className="popup-container">
					<div className="close-button-div">
						<button onClick={() => setOpen(false)}>
							<IoMdCloseCircle className="close-popup" size={30} />
						</button>
						<div className="rating-container">
							{[...Array(5)].map((star, index) => {
								const currentRating = index + 1;
								return (
									<label>
										<input
											className="radio"
											type="radio"
											name="rating"
											value={currentRating}
											onClick={() => setNewRating(currentRating)}
										/>
										<FaStar
											color={
												currentRating <= (hover || newRating)
													? "#ffc107"
													: "#e7e7e7"
											}
											className="stars"
											size={40}
											onMouseEnter={() => setHover(currentRating)}
											onMouseLeave={() => setHover(null)}
										/>
									</label>
								);
							})}
						</div>
					</div>
					<button className="send-rating" onClick={handleRatingSubmit}>
						SEND RATING
					</button>
				</div>
			)}
		</div>
	);
};

export default Rating;
