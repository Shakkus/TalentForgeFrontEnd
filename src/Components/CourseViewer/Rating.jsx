import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import "./CourseViewer.css";

const Rating = () => {
	const [rating, setRating] = useState(null);
	const [hover, setHover] = useState(null);

	const handleRatingChange = (value) => {
		if (value === rating) {
			// Si se hace clic en una estrella ya seleccionada, deseleccionarla
			setRating(null);
			console.log(rating);
		} else {
			console.log(rating);
			setRating(value);
		}
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
			<button className="rating-button" onClick={() => setOpen(!open)}>
				RATE THIS VIDEO
			</button>
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
											onClick={() => setRating(currentRating)}
											onChange={() => handleRatingChange(currentRating)}
										/>
										<FaStar
											color={
												currentRating <= (hover || rating)
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
					<button className="send-rating">SEND RATING</button>
				</div>
			)}
		</div>
	);
};

export default Rating;
