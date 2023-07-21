import "../CourseViewer.css";
import { useRef, useState } from "react";
import Comment from "./Comment";
import { useAuth } from "../../../context/authContext";

const Comments = () => {
	const { user } = useAuth();
	const textareaRef = useRef(null);
	const[comments, setComments] = useState([])

	const handleInputChange = () => {
		const { current: textarea } = textareaRef;
		textarea.style.height = "auto";
		textarea.style.height = textarea.scrollHeight + "px";
	};
	return (
		<div className="comments-container">
			<div className="mainContainer">
				{user ? (
					<img className='user-image' src={user.photoURL} alt="si" />
				) : (
					<img className='comment-image' src="https://res.cloudinary.com/dal385dkc/image/upload/v1689784018/TEST%20IMAGES/profile_pxiqlp.jpg"></img>
				)}
				<textarea
					onChange={handleInputChange}
					ref={textareaRef}
					id="comment-textarea"
					type="text"
					placeholder="Write a comment..."
					className="comment-input"
				/>
				<button className="send-button">SEND</button>
			</div>
			<Comment />
		</div>
	);
};

export default Comments;
