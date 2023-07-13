
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/authContext.js";
import "./Login.css";


const Login = () => {
	

	const navigate = useNavigate()
	const { logginWhitGoogle, logginWhitTwitter } = useAuth()
	const [errors, setErrors] = useState()


  const handleAuthGoogle = async () => {
    try {
    	await logginWhitGoogle()
    	navigate("/home")
    } catch (error) {
      	setErrors(errors.code)
      	if (errors.code === "auth/popup-closed-by-user"
        || errors.code === "auth/cancelled-popup-request") {
        setErrors("Login cancelled")
      }
    }
  }

  const handleAuthTwitter = async () => {
    try {
      await logginWhitTwitter()
      navigate("/home")
    } catch (error) {
      setErrors(errors.code)
      if (errors.code === "auth/popup-closed-by-user"
        || errors.code === "auth/cancelled-popup-request") {
        setErrors("Login cancelled")
      }

    }
  }
	
  return (
    <div className="login mt-48">
      <h1>Account Login</h1>
      <div className="continueWith">
        <div className="continueWithGoogle">
          <button className="text-black" onClick={handleAuthGoogle} >Continue with</button>

          <img src="image 109.png" alt="" />
        </div>
        <div className="continueWithGmail">
          <button className="text-black" onClick={handleAuthGoogle} >Continue with</button>
          <img src="image 87.png" alt="" />
        </div>

        <div className="continueWithTwitter">
          <button onClick={handleAuthTwitter} className="text-black">Continue with</button>
          <img src="image 88.png" alt="" />
        </div>
      </div>

      {errors && <p>{errors}</p>}

    <form>
        <div className="formContainer">

			<div className="inputName">
				<label htmlFor="">Email</label>
				<input type="text" id='email' className='inputText text-black' name="Email"/>
			</div>

          	<div className="inputPassword">
            	<label htmlFor="">Password</label>
            	<input type="text" id='password' className='inputText text-black' name="Name"/>
          	</div>

        		<button type="submit" value="Submit"/>

        </div>
    </form>
</div>
  );
}


export default Login;
