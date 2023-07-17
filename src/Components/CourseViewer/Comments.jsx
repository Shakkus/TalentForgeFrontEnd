import "./CourseViewer.css";
import { useRef } from "react";

const Comments = () => {
	const textareaRef = useRef(null);

	const handleInputChange = () => {
		const { current: textarea } = textareaRef;
		textarea.style.height = "auto";
		textarea.style.height = textarea.scrollHeight + "px";
	};
	return (
		<div className="mainContainer">
			<textarea
                onChange={handleInputChange}
                ref={textareaRef}
				id="comment-textarea"
				type="text"
				placeholder="Write a comment..."
				className="comment-input"
			/>
		</div>
	);
};

export default Comments;
