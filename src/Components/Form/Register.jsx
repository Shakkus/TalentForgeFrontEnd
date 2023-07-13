import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
import { useState } from "react";
import axios from "axios";
import { validate } from "./validate";
import "./Register.css";


const Form = () => {
  const navigate = useNavigate()

  const { logginWhitGoogle, logginWhitTwitter} = useAuth()
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    email: "",
    country: "",
    dateOfBirth: "",
    password: "",
    confirmPass: "",
    accountType: "",
    registerWith: ""
  });
  
  const countrys = ["Argentina", "Chile", "Brasil", "Venezuela", "Bolivia", "Perú",  "Colombia",  "Ecuador",  "México",  "El Salvador",  "Honduras",  "España",  "Panamá",  "Cuba",  "Costa Rica",  "Uruguay",  "Estados Unidos",  "España",  "Alemania",  "Reino Unido",  "Alemania",  "Francia",  "Italia",  "Canadá", "Rusia"];
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validate(input);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    await axios.post('https://talent-forge-data.cyclic.app/user/', input);
    setInput({
      fullName: "",
      username: "",
      email: "",
      country: "",
      dateOfBirth: "",
      password: "",
      confirmPass: "",
      accountType: "",
      registerWith: ""
      });
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setInput({ ...input, [name]: value });
      setErrors({
        ...errors,
        [name]: validate({ ...input, [name]: value })[name],
      });
    };

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
    <div className="form">
      <h1 className="formTitle">Account Registration</h1>
      <div className="continueWith">
        <div className="continueWithGoogle">
          <button onClick={handleAuthGoogle}>Continue with</button>
          <img src="image 109.png" alt="" />
        </div>

        <div className="continueWithGmail">
          <button onClick={handleAuthGoogle}>Continue with</button>
          <img src="image 87.png" alt="" />
        </div>

        <div className="continueWithTwitter">
          <button onClick={handleAuthTwitter}>Continue with</button>
          <img src="image 88.png" alt="" />
        </div>
      </div>

      <form  onSubmit={handleSubmit}>
        <div className="formContainer">

          <div className="inputNameLastname">
            <label htmlFor="">Full Name</label>
            <input className="inputText" type="text" name="fullName" value={input.fullName} onChange={handleChange} placeholder="type full name..."/>
            {errors.fullName && (<span style={{ color: "red" }}> {errors.fullName}</span>)}
          </div>

          <div className="inputEmail">
            <label htmlFor="">Email</label>
            <input className="inputText" type="text" name="email" value={input.email} onChange={handleChange} placeholder="example@gmail.com"/>
            {errors.email && (<span style={{ color: "red" }}> {errors.email}</span>)}
          </div>

          <div className="inputNameLastname">
            <label htmlFor="">Username</label>
            <input className="inputText" type="text" name="username" value={input.username} onChange={handleChange} placeholder="@"/>
            {errors.username && (<span style={{ color: "red" }}> {errors.username}</span>)}
          </div>

          <div className="inputCountry">
            <label htmlFor="">Country</label>
            <select className="inputSelect" name="country" value={input.country} onChange={handleChange}>
              {countrys.map((country) => ( <option className="optionCountry" value={country}> {country} </option> ))}
            </select>
            {errors.country && (<span style={{ color: "red" }}> {errors.country}</span>)}
          </div>
          
          <div className="inputPassword">
            <label htmlFor="">dateOfBirth</label>
            <input className="inputText" type="dateOfBirth" name="dateOfBirth" value={input.dateOfBirth} onChange={handleChange} placeholder="xx/xx/xxxx"/>
            {errors.dateOfBirth && (<span style={{ color: "red" }}> {errors.dateOfBirth}</span>)}
          </div>
          
          <div className="inputPassword">
            <label htmlFor="">Password</label>
            <input className="inputText" type="password" name="password" value={input.password} onChange={handleChange} placeholder="type password..."/>
            {errors.title && (<span style={{ color: "red" }}> {errors.title}</span>)}
          </div>

          <div className="inputConfirmPassword">
            <label htmlFor="">Confirm Password</label>
            <input className="inputText" type="password" name="confirmPass" value={input.confirmPass} onChange={handleChange} placeholder="type confirmation..."/>
            {errors.confirmPass && (<span style={{ color: "red" }}> {errors.confirmPass}</span>)}
          </div>

          <div className="inputAccType">
            <label htmlFor="">Account Type</label>
            <select className="inputSelect" name="accountType" value={input.accountType} onChange={handleChange}>
                <option value="">SELECT</option>
								<option value="user">User</option>
								<option value="teacher">Teacher</option>
            </select>
            {errors.accountType && (<span style={{ color: "red" }}> {errors.accountType}</span>)}
          </div>

          <div>
              <button type="submit" className="buttonSubmit"/>
          </div>

        </div>
      </form>
    </div>
  );
};

export default Form;
