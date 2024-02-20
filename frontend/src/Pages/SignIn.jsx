import { User } from '../User.jsx';
import { USER_SIGNIN } from '../actions.jsx';
import { React, axios, toast, useContext, useEffect, useNavigate, useState } from '../imports.js';
import { checkAuthentication } from '../utils.js';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(User);
  const { userInfo } = state;
  // Use checkAuthentication function to make authenticated request

  useEffect(() => {
    if (userInfo) {
      checkAuthentication(userInfo);
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
      // navigate("/");
    } catch (error) {
      toast.error((error.message));
    }

    // For demonstration purposes, let's log the entered values
    console.log('Email:', email);
    console.log('Password:', password);
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
    <div className='signin-div'>
      <h3 className='signin-label'>Sign In</h3>
      <form onSubmit={submitHandler} className='form-container'>
        {/* <label htmlFor="email" className='test'>Email</label> */}
        <input className='test'
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        {/* <label htmlFor="password" className='test'>Password</label> */}
        <input className='test'
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className='signin-button test'>Sign In</button>
      </form>
      <button onClick={autoFill} className='test'>Auto Fill</button>
    </div>
  );
};

export default SignIn;
