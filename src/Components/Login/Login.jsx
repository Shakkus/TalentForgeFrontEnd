import {useForm} from 'react-hook-form'

import "./Login.css";

const Login = () => {

    const {register,handleSubmit,formState: {errors} } = useForm();

    const onSubmit = () => {

    }
          
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

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="formContainer">
                    <div className="inputName">
                        <label htmlFor="">Email</label>
                        <input type="text" id='email' className='inputText'
                        {...register('email', {required: true})}/>
                        {errors.email?.type === 'required' && 
                        (<p className='emailError'>Campo requerido</p>)}
                    </div>
                    <div className="inputPassword">
                        <label htmlFor="">Password</label>
                        <input type="text" id='password' className='inputText'
                        {...register('password',{required: true})}/>
                        {errors.password?.type === 'required' &&
                        (<p className='passwordError'>Campo requerido</p>)}
                    </div>
                    <div>
                        <input type="submit" value="Submit" className="buttonSubmit" />
                    </div>
                </div>
            </form>
        </div>
  );
};

export default Login;
