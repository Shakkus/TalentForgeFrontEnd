import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./CourseViewer.css";

const Rating = () => {
	const [rating, setRating] = useState(null);
	const [hover, setHover] = useState(null);
	return (
		<div className="rating-container">
			{[...Array(5)].map((star, index) => {
				const currentRating = index + 1;
				return (
					<>
						<input
							className="radio"
							type="radio"
							name="rating"
							value={currentRating}
							onClick={() => setRating(currentRating)}
						/>
						<FaStar
							color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
							className="stars"
							size={40}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
						/>
					</>
				);
			})}
		</div>
	);
};

export default Rating;
