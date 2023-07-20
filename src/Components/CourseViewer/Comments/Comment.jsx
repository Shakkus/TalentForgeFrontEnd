import { useEffect, useState } from "react";
import "./Comment.css";
import axios from "axios";
import { useParams } from "react-router";
import { useAuth } from "../../../context/authContext";

    // { id, content, user}
const Comment = () => {
	const { id } = useParams();
    const { user } = useAuth
    const[commentContent, setCommentContent] = useState({
        id: '',
        // 1.000 caracteres max
        content: 'Comentario de prueba || Comentario de prueba || Comentario de prueba || Comentario de prueba || Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de prueba ||Comentario de pruebassss',
        user: {
            id: '',
            name: '',
            photo: ''
        }
    })

	return (
		<div className="comment-container">
            {commentContent ? (
					<img className='comment-image' src={commentContent.user.photo} alt="si" />
				) : (
					<img className='comment-image' src="https://res.cloudinary.com/dal385dkc/image/upload/v1689784018/TEST%20IMAGES/profile_pxiqlp.jpg"></img>
				)}
			<div className="comment">
                <p>{commentContent.content}</p>
            </div>
		</div>
	);
};

export default Comment;
