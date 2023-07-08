import {useForm} from 'react-hook-form'
import { Link } from 'react-router-dom';
import "./Login.css";

const Login = () => {

    const {register,handleSubmit,formState: {errors} } = useForm();

    const onSubmit = () => {

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
                    <div className="inputName">
                        <label htmlFor="">Email</label>
                        <input type="text" id='email' className='inputText text-black'
                        {...register('email', {required: true})}/>
                        {errors.email?.type === 'required' && 
                        (<p className='emailError'>Campo requerido</p>)}
                    </div>
                    <div className="inputPassword">
                        <label htmlFor="">Password</label>
                        <input type="text" id='password' className='inputText text-black'
                        {...register('password',{required: true})}/>
                        {errors.password?.type === 'required' &&
                        (<p className='passwordError'>Campo requerido</p>)}
                    </div>
                    <div>
                        <Link to='/home'>
                            <input type="submit" value="Submit" className="buttonSubmit bg-violet-500" />
                        </Link>
                    </div>
                </div>
            </form>
        </div>
  );
};

export default Login;
