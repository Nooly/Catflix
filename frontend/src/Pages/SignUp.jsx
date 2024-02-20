import { React, axios, toast, useContext, useEffect, useNavigate, useState } from '../imports.js';
import { User } from '../User.jsx';
import {  USER_SIGNUP } from '../actions.jsx';
import { checkAuthentication } from '../utils.js';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const submitHandler = async (e) => {
    e.preventDefault();

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
      const { data } = await axios.post("/api/v1/users/signup", { email: email, password: password });
      ctxDispatch({ type: USER_SIGNUP, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate("/");
    } catch (error) {
      toast.error(("User already registered"));
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
    if (password.length < 3 || password.length > 12) {
      return false;
    }

    const passwordRegex = /^[a-zA-Z0-9]+$/;
    return passwordRegex.test(password);
  };

  return (
    <div className='sign-div'>
      <h3 className='sign-label'>Sign Up</h3>
      <form onSubmit={submitHandler} className='form-container'>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className='sign-button'>Sign Up</button>
      </form>
      <button onClick={autoFill}>Auto Fill</button>
    </div>
  );
};

export default SignUp;
