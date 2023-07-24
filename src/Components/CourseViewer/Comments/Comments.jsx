import "../CourseViewer.css";
import { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import { useAuth } from "../../../context/authContext";
import axios from "axios";
import { useParams } from "react-router";

const Comments = () => {
	const { user } = useAuth();
	const textareaRef = useRef(null);
	const [comments, setComments] = useState([]);
	const [commentError, setCommentError] = useState(false);
	const [getError, setGetError] = useState(false);
	const { noComments, setNoComments } = useState(false);
	const { id } = useParams();

	// ID DEL USUARIO
	const localStorageUserId = localStorage.getItem("userId");
	const googleUserId = user?.uid;
	// -----------------

	// COMENTARIO A ENVIAR
	const [commentContent, setCommentContent] = useState({
		commentUser: {
			id: "",
			photo: "",
			name: "",
		},
		content: "",
	});
	// -----------------------------

	// GET USER INFO
	useEffect(() => {
		// FOTO DEL USUARIO
		const firebaseUserImage = user?.photoURL;
		const localUserImage = localStorage?.getItem("userImage");

		const currentPhoto = firebaseUserImage || localUserImage;

		if (currentPhoto) {
			setCommentContent((prevCommentContent) => ({
				...prevCommentContent,
				commentUser: {
					...prevCommentContent.commentUser,
					photo: currentPhoto,
				},
			}));
		}

		// NOMBRE DEL USUARIO
		const firebaseUserName = user?.displayName;
		const localUserName = localStorage?.getItem("username");

		const currentUserName = firebaseUserName || localUserName;

		if (currentUserName) {
			setCommentContent((prevCommentContent) => ({
				...prevCommentContent,
				commentUser: {
					...prevCommentContent.commentUser,
					name: currentUserName,
				},
			}));
		}
	}, [user, localStorageUserId, googleUserId]);
	// ---------------

	useEffect(() => {
		try {
			const currentId = localStorageUserId || googleUserId;
			if (!currentId) {
				return;
			}
			setCommentContent((prevCommentContent) => ({
				...prevCommentContent,
				commentUser: {
					...prevCommentContent.commentUser,
					id: currentId,
				},
			}));

			// const fetchData = async () => {
			// 	const response = await axios.get(`getdeloscomentariosdelcurso${id}`);
			// 	const fetchedComments = response.data.interactions.comments;
			// 	if (response.status === 200) {
			// 		if (fetchedComments.length > 0) setComments(fetchedComments);
			// 		setNoComments(true);
			// 	}
			// 	if (response.status === 500) setGetError(true);
			// };
		} catch (error) {
			setGetError(true);
		}
	}, [user, localStorageUserId, googleUserId, id]);

	const handleChange = (event) => {
		const comment = event.target.value;
		setCommentContent({ ...commentContent, content: comment });
		console.log(Array.isArray(comments));
	};

	const handleSubmit = () => {
		try {
			setComments((prevComments) => [...prevComments, commentContent]);
			console.log(comments);
			// const response = axios.put(`rutabackend${id}`, commentContent);
			// if (response.status === 200) {
			// 	setCommentError(false);
			// }
			// if (response.status === 500) {
			// 	setCommentError(true);
			// }
		} catch (error) {
			setCommentError(true);
		}
	};
	return (
		<div className="comments-container">
			<div className="mainContainer">
				{user ? (
					<img className="user-image" src={user.photoURL} alt="si" />
				) : (
					<img
						className="comment-image"
						src="https://res.cloudinary.com/dal385dkc/image/upload/v1689784018/TEST%20IMAGES/profile_pxiqlp.jpg"
					></img>
				)}
				<textarea
					name="content"
					onChange={handleChange}
					value={commentContent.content}
					ref={textareaRef}
					id="comment-textarea"
					type="text"
					placeholder="Write a comment..."
					className="comment-input"
				/>
				<button className="send-button" onClick={handleSubmit}>
					SEND
				</button>
			</div>
			{commentError && (
				<span class="text-red-500 text-sm">
					There was an error posting the comment, try again
				</span>
			)}
			{comments.length > 0 ? (
				comments.map((comment) => {
					<div className="comment-container">
						{comment.photo ? (
							<img className="comment-image" src={comment.photo} alt="si" />
						) : (
							<img
								className="comment-image"
								src="https://res.cloudinary.com/dal385dkc/image/upload/v1689784018/TEST%20IMAGES/profile_pxiqlp.jpg"
							></img>
						)}
						<div className="comment-reply">
							<div className="content">
								<p>{comment.content}</p>
							</div>
							<button className="reply-button">reply</button>
						</div>
					</div>;
				})
			) : (
				<div className="no-comments-div">
					<span class="text-gray-500">No comments yet</span>
				</div>
			)}
		</div>
	);
};

export default Comments;
