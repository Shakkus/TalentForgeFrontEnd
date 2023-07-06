import "./Login.css";

const Login = () => {

  return (
    <div className="login">
        <h1>Account Login</h1>
        <div className="continueWith">
            <div className="continueWithGoogle">
            <p>Continue with</p>
            <img src="image 109.png" alt="" />
            </div>
            <div className="continueWithGmail">
            <p>Continue with</p>
            <img src="image 87.png" alt="" />
            </div>

            <div className="continueWithTwitter">
            <p>Continue with</p>
            <img src="image 88.png" alt="" />
            </div>
        </div>

        <form action="">
            <div className="inputName">
                <label htmlFor="">Email</label>
                <input type="text" />
            </div>
            <div className="inputPassword">
                <label htmlFor="">Password</label>
                <input type="text" />
            </div>
            <div>
            <input type="submit" value="Submit" className="buttonSubmit" />
          </div>
        </form>
    </div>
  );
};

export default Login;
