import { React, axios, toast, useNavigate, useState } from '../imports.js';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      const { data } = await axios.post("/api/v1/users/signin", {email: email, password: password});
      console.log(data);
      console.log("success");
      navigate("/");
    } catch (error) {
      toast.error((error.message));
    }

    // For demonstration purposes, let's log the entered values
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const autoFill = (e) =>{
    let autoEmail = "dev@dev.com";
    let autoPassword = "dev";
    document.getElementById('email').value = autoEmail;
    document.getElementById('password').value = autoPassword;
    setEmail(autoEmail);
    setPassword(autoPassword);
  }

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
