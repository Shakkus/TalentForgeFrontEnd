import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
// import { useFireBase } from "reactfire";


const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();
	// const firebase = useFireBase();

	// LOGOUT DEL USUARIO
	// useEffect(() => {
	// 	localStorage.removeItem("loggedUser");

	// 	const logOut = firebase.auth().onAuthStateChanged((user) => {
	// 		if (user) {
	// 			navigate("/home");
	// 		}
	// 	});

	// 	return () => logOut();
	// }, []);
	// ------------------


	// VALIDACION USUARIO LOGEADO

	const onSubmit = async (data) => {
		// try {
		// 	const currentUser = firebase.auth().currentUser;

		// 	if (currentUser) {
		// 		const idToken = await currentUser.getIdToken();
		// 		localStorage.setItem("loggedUser", idToken);
		// 		console.log("Token almacenado en localStorage", idToken);
		// 		navigate("/home");
		// 	} else {
		// 		console.log("No hay usuario autenticado");
		// 	}
		// } catch (error) {
		// 	console.log("Hubo un error" + error.message);
		// }
	};
    // ------------------------



    const curso = () => {

    }





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
					<p className="text-black">Continue with</p>
					<img src="image 88.png" alt="" />
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="formContainer">
					{/* INPUT EMAIL     */}
					<div className="inputName">
						<label htmlFor="">Email</label>
						<input
							name="email"
							type="text"
							id="email"
							className="inputText text-black"
							{...register("email", { required: true })}
						/>
						{errors.email?.type === "required" && (
							<p className="emailError">Campo requerido</p>
						)}
					</div>
					{/* ------- */}

					{/* INPUT PASSWORD */}
					<div className="inputPassword">
						<label htmlFor="">Password</label>
						<input
							name="password"
							type="text"
							id="password"
							className="inputText text-black"
							{...register("password", { required: true })}
						/>
						{errors.password?.type === "required" && (
							<p className="passwordError">Campo requerido</p>
						)}
					</div>
					{/* ------------- */}
					<div>
						{/* <Link>
							<input
								type="submit"
								value="Submit"
								className="buttonSubmit bg-violet-500"
							/>
						</Link> */}
						<button
							type="submit"
							className="buttonSubmit bg-violet-500"
						>
							SUBMIT
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
