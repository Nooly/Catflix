import { React, axios, toast, useContext, useEffect, useNavigate, useState } from '../imports.js';
import { User } from '../User.jsx';
import { USER_SIGNUP } from '../actions.jsx';
import { checkAuthentication } from '../utils.js';
import '../Styles/Sign.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [step2, setStep2] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(User);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      const checkAuth = async () => {
        let isAuth = await checkAuthentication(userInfo);
        // if (isAuth) navigate("/");
      }
      checkAuth();
    }
  }, []);

  const submitHandler1 = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!validateEmail(email)) {
      toast.error("Invalid email address, example@example.example");
      return;
    }
    else {
      const { data } = await axios.post("/api/v1/users/check-user-exist", { email: email });
      if (!data) {
        setStep2(true);
      }
      else {
        toast.error(("User already registered"));
      }
    }


  };

  const submitHandler2 = async (e) => {
    if (!validatePassword(password)) {
      toast.error("Password must be between 3 and 12 characters and contain only letters and numbers");
      return;
    }

    try {
      const { data } = await axios.post("/api/v1/users/signup", { email: email, password: password });
      ctxDispatch({ type: USER_SIGNUP, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setSuccess(true)
    } catch (error) {
      toast.error(("Something went wrong, try again"));
    }
  }
  useEffect(() => {
    if (success)
      navigate("/");



  }, [success])


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
    if (password.length < 3 || password.length > 12) {
      return false;
    }

    const passwordRegex = /^[a-zA-Z0-9]+$/;
    return passwordRegex.test(password);
  };

  return (
    <div className='sign-overlay'>
      <div className='sign-bg'>
        <img className='sign-logo' src='public\netflix_official_logo_icon_168085.png'></img>

        <div className='sign-up-div'>
          <h3 className='sign-label text-white'>Unlimited movies, TV shows, and more</h3>
          <span className='text-white'>Watch anywhere. Cancel anytime. </span>
          <span className='text-white'>Ready to watch? Enter your email to create or restart your membership.</span>

          {!step2 &&
            <form onSubmit={submitHandler1} className='form-container'>
              <input
              className=' border-round margin5'
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
              />
              <button type="submit" className='sign-button text-white border-round margin5'>Get Started!</button>
            </form>
          }
          {step2 &&

            <form onSubmit={submitHandler2} className='form-container border-round margin5'>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button type="submit" className='sign-button text-white border-round margin5'>Sign Up</button>
            </form>
          }

          {/* <button onClick={autoFill} className=''>Auto Fill</button> */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
