import "../CourseViewer.css";
import {useEffect, useRef, useState} from "react";
import Comment from "./Comment";
import {useAuth} from "../../../context/authContext";
import axios from "axios";
import {useParams} from "react-router";

const Comments = () => {
	const {user} = useAuth();
	const textareaRef = useRef(null);
	const [comments, setComments] = useState([]);
	const [commentError, setCommentError] = useState(false);
	const [getError, setGetError] = useState(false);
	const {id} = useParams();

	// ID DEL USUARIO
	const localStorageUserId = localStorage.getItem("userId");
	const googleUserId = user?.uid;
	// -----------------

	// COMENTARIO A ENVIAR
	const [commentContent, setCommentContent] = useState({
		id: "",
		image: "",
		name: "",
		comment: "",
	});
	// -----------------------------

	useEffect(() => {
		try {
			const currentId = localStorageUserId || googleUserId;
			const firebaseUserImage = user?.photoURL;
			const localUserImage = localStorage?.getItem("userImage");
			const firebaseUserName = user?.displayName;
			const localUserName = localStorage?.getItem("username");

			const currentUserName = firebaseUserName || localUserName;

			const currentPhoto = firebaseUserImage || localUserImage;

			if (!currentId) {
				return;
			} else {
				setCommentContent({
					...commentContent,
					id: currentId,
					image: currentPhoto,
					name: currentUserName,
				});
			}
			const fetchData = async () => {
				const response = await axios.get(
					`https://talent-forge-data.cyclic.app/courses/${id}`
				);
				// console.log(response);
				const fetchedComments = response.data.comments;
				if (response.status === 200) {
					if (fetchedComments.length > 0) {
						setComments(fetchedComments);
					}
				}
				if (response.status === 500) setGetError(true);
			};

			fetchData();
		} catch (error) {
			setGetError(true);
		}
	}, [user, localStorageUserId, googleUserId, id]);

	const handleChange = (event) => {
		const comment = event.target.value;
		setCommentContent({
			...commentContent,
			comment: comment,
		});
		console.log(Array.isArray(comments));
	};

	const isContentValid = (content) => {
		const trimmedContent = content.trim();

		return trimmedContent.length > 0;
	};

	const handleSubmit = () => {
		try {
			// Crea un nuevo objeto con los mismos contenidos de commentContent
			const newComment = {
				id: commentContent.id,
				image: commentContent.image,
				name: commentContent.name,
				comment: commentContent.comment,
			};

			setComments((prevComments) => [...prevComments, newComment]);
			setCommentContent({
				...commentContent,
				comment: "",
			}); // Borra el contenido del textarea
			setCommentError(false);

			axios.put(
				`https://talent-forge-data.cyclic.app/courses/comment/${id}`,
				newComment
			);
		} catch (error) {
			setCommentError(true);
		}
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleSubmit();
		}
	};
	return (
		<div>
			<div className="comments-container">
				<div className="mainContainer">
					{user ? (
						<img className="user-image" src={user.photoURL} alt="si" />
					) : (
						<img
							className="comment-image"
							src="https://res.cloudinary.com/dal385dkc/image/upload/v1689784018/TEST%20IMAGES/profile_pxiqlp.jpg"></img>
					)}
					<textarea
						name="comment"
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						value={commentContent.comment}
						ref={textareaRef}
						id="comment-textarea"
						type="text"
						placeholder="Write a comment..."
						className="comment-input"
					/>
					<button
						disabled={!isContentValid(commentContent.comment)}
						className="send-button"
						onClick={handleSubmit}>
						SEND
					</button>
				</div>
			</div>
			{commentError && (
				<span class="text-red-500 text-sm">
					There was an error posting the comment, try again
				</span>
			)}
			{comments.length > 0 ? (
				comments.map((comment) => {
					return (
						<div className="comment-container">
							<p>{comment.name}</p>
							{comment.image ? (
								<img className="comment-image" src={comment.image} alt="si" />
							) : (
								<img
									className="comment-image"
									src="https://res.cloudinary.com/dal385dkc/image/upload/v1689784018/TEST%20IMAGES/profile_pxiqlp.jpg"></img>
							)}
							<div className="comment-reply">
								<div className="content">
									<p>{comment.comment}</p>
								</div>
								{/* <button className="reply-button">reply</button> */}
							</div>
						</div>
					);
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
