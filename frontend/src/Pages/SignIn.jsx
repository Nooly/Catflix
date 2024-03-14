import { User } from '../User.jsx';
import { USER_SIGNIN } from '../actions.jsx';
import { React, axios, toast, useContext, useEffect, useNavigate, useState } from '../imports.js';
import { checkAuthentication } from '../utils.js';
import '../Styles/Sign.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(User);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      const checkAuth = async () => {
        let isAuth = await checkAuthentication(userInfo);
        if (isAuth) navigate("/");
      }
      checkAuth();
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Validation checks
    if (!validateEmail(email)) {
      toast.error("Invalid email address, example@example.example");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be between 3 and 12 characters and contain only letters and numbers");
      return;
    }

    try {
      const { data } = await axios.post("/api/v1/users/signin", { email: email, password: password });
      ctxDispatch({ type: USER_SIGNIN, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate("/");
    } catch (error) {
      toast.error((error.message));
    }
  };

  const autoFill = (e) => {
    let autoEmail = "dev@dev.com";
    let autoPassword = "dev";
    document.getElementById('email').value = autoEmail;
    document.getElementById('password').value = autoPassword;
    setEmail(autoEmail);
    setPassword(autoPassword);
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Check if password is between 4 and 12 characters
    if (password.length < 3 || password.length > 12) {
      return false;
    }

    // Check if password contains only letters and numbers
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    return passwordRegex.test(password);
  };


  return (
    <div className='sign-overlay'>
      <div className='sign-bg'>
        <img className='sign-logo' src='public\netflix_official_logo_icon_168085.png'></img>
        <div className='sign-div'>
          <h3 className='text-white'>Sign In</h3>
          <form onSubmit={submitHandler} className='form-container'>
            {/* <label htmlFor="email" className='test'>Email</label> */}
            <input className='margin5 border-round'
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            {/* <label htmlFor="password" className='test'>Password</label> */}
            <input className='margin5 border-round'
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit" className='sign-button text-white margin5 border-round'>Sign In</button>
          </form>
          <button onClick={autoFill} className='margin5 border-round'>Auto Fill</button>
          <a href='/signup' className='forgot-password'> Forgot password?</a>
          <div className='new-div'>New to Catflix?
            <a href='/signup' className='text-white'> Sign up now.</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
