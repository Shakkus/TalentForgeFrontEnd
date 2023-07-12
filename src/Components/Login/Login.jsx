import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../context/authContext.js";
import { useEffect } from "react";
import "./Login.css";

const Login = () => {
	const { user } = useAuth();
	useEffect(() => {
		// console.log(curretnUser);
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [userData, setUserData] = useState({
		nameLastname: "",
		Email: "",
		Password: "",
	});

	const navigate = useNavigate();

	const [error, setError] = useState();

	const { logIn, logginWhitGoogle, logginWhitTwitter } = useAuth();

	const handleChange = ({ target: { name, value } }) => {
		setUserData({ ...userData, [name]: value });
		//console.log(event.target.nameLastname)
	};

	const handleSubmitAuth = async (event) => {
		event.preventDefault();
		setError("");
		try {
			await logIn(userData.Email, userData.Password);
			const currentUser = user.accessToken;

			if (currentUser) {
				const idToken = await currentUser;
				localStorage.setItem("loggedUser", idToken);
				console.log("Token almacenado en localStorage", idToken);
                navigate("/home");
			}
		} catch (error) {
			//  console.log(error.code)
			setError(error.code);
			if (
				error.code === "auth/user-not-found" ||
				error.code === "auth/invalid-email"
			) {
				setError("Invalid Email");
			} else if (error.code === "auth/wrong-password") {
				setError("Invalid password");
			}
		}
		console.log(user);
	};

	const handleAuthGoogle = async () => {
		try {
			await logginWhitGoogle();
			navigate("/home");
		} catch (error) {
			setError(error.code);
			if (
				error.code === "auth/popup-closed-by-user" ||
				error.code === "auth/cancelled-popup-request"
			) {
				setError("Login cancelled");
			}
		}
	};

	const handleAuthTwitter = async () => {
		try {
			await logginWhitTwitter();
			navigate("/home");
		} catch (error) {
			setError(error.code);
			if (
				error.code === "auth/popup-closed-by-user" ||
				error.code === "auth/cancelled-popup-request"
			) {
				setError("Login cancelled");
			}
		}
	};

	// const firebase = useFireBaseApp();

	// LOGOUT DEL USUARIO
	
	// ------------------

	// VALIDACION USUARIO LOGEADO

	// ------------------------

	return (
		<div className="login mt-48">
			<h1>Account Login</h1>
			<div className="continueWith">
				<div className="continueWithGoogle">
					<p className="text-black">Continue with</p>
					<img src="image 109.png" alt="" />
				</div>
				<div className="continueWithGmail">
					<p className="text-black">Continue with</p>
					<img src="image 87.png" alt="" />
				</div>

				<div className="continueWithTwitter">
					<button onClick={handleAuthTwitter} className="text-black">
						Continue with
					</button>
					<img src="image 88.png" alt="" />
				</div>
			</div>

			{error && <p>{error}</p>}
			<form onSubmit={handleSubmitAuth}>
				<div className="formContainer">
					<div className="inputName">
						<label htmlFor="">Email</label>
						<input
							type="text"
							id="email"
							className="inputText text-black"
							name="Email"
							{...register("Email", { required: true })}
							onChange={handleChange}
						/>
						{errors.email?.type === "required" && (
							<p className="emailError">Campo requerido</p>
						)}
					</div>
					<div className="inputPassword">
						<label htmlFor="">Password</label>
						<input
							type="text"
							id="password"
							className="inputText text-black"
							name="Name"
							{...register("Password", { required: true })}
							onChange={handleChange}
						/>
						{errors.password?.type === "required" && (
							<p className="passwordError">Campo requerido</p>
						)}
					</div>
					<div>
						<input
							type="submit"
							value="Submit"
							className="buttonSubmit bg-violet-500"
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
export default Login;
