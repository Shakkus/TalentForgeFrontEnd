import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/authContext.js";
import axios from "axios";
import "./Login.css";


const Login = () => {

  const navigate = useNavigate()
  const { logginWhitGoogle, logginWhitTwitter } = useAuth()
  const [errors, setErrors] = useState()
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
    // setErrors({
    //   ...errors,
    //   [name]: validate({ ...loginInfo, [name]: value })[name],
    // });
  };

  const tokenInfoSetter = (data) => {
    localStorage.setItem('userAccountType',data.accountType)
    localStorage.setItem('userCountry',data.country)
    localStorage.setItem('userDate',data.dateOfBirth)
    localStorage.setItem('userDesc',data.description)
    localStorage.setItem('userEmail',data.email)
    localStorage.setItem('userfullName',data.fullName)
    localStorage.setItem('userImage',data.profileImage)
    localStorage.setItem('userId',data.userId)
    localStorage.setItem('username',data.username)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    //const formErrors = validate(input);
    //if (Object.keys(formErrors).length > 0) {
      //setErrors(formErrors);
      //return;
    //}
    const { data } = await axios.post('https://talent-forge-data.cyclic.app/login/', loginInfo);
    tokenInfoSetter(data)
    console.log(localStorage)
    setLoginInfo({
      username: "",
      password: "",
      });
    navigate("/home")
    }
  

  const handleAuthGoogle = async () => {
    try {
      await logginWhitGoogle()
      navigate("/home")
      } catch (error) {
        setErrors(error.code)
        if (error.code === "auth/popup-closed-by-user"
          || error.code === "auth/cancelled-popup-request") {
          setErrors("Login cancelled")
        }
    }
  }

  const handleAuthTwitter = async () => {
    try {
      await logginWhitTwitter()
      navigate("/home")
      } catch (error) {
        setErrors(error.code)
        if (error.code === "auth/popup-closed-by-user"
          || error.code === "auth/cancelled-popup-request") {
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

      
      <form onSubmit={handleSubmit}>
        <div className="formContainer">

          <div className="inputName">
            <label htmlFor="">Username</label>
            <input type="text" className='inputText text-black'  name="username" value={loginInfo.username} onChange={handleChange}/>
          </div>

          <div className="inputPassword">
            <label htmlFor="">Password</label>
            <input type="password" className='inputText text-black'name="password" value={loginInfo.password} onChange={handleChange}/>
          </div>

            <input type="submit" value="Submit" className="buttonSubmit bg-violet-500" />

        </div>
      </form>
    </div>
  );
}
export default Login;

