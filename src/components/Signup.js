import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/signup.css';

const Signup = (props) => {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [userchecker, setuserchecker] = useState(true);

  const handleClick = async (e) => {
    props.setProgress(30)
    e.preventDefault();
    if (credential.password !== credential.cpassword) {
      setPasswordMatchError(true);
      return;
    }
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      setuserchecker(true)
      navigate("/");
      props.setProgress(100)
    } else {
      setuserchecker(false)
    }
  };

  const onChange = (e) => {
    setuserchecker(true)
    setCredential({ ...credential, [e.target.name]: e.target.value });
    setPasswordMatchError(false); // Reset error on input change
  };

  return (
    <div>
      <form onSubmit={handleClick}>
        <div className='newnoteli'>
          <h2><span className='logoli'><i class="fa-solid fa-user-plus"></i></span>Signup</h2>
          <label htmlFor="name">Name</label>
          <input type="text" id='name' name='name' onChange={onChange} value={credential.name} required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={onChange} value={credential.email} required/>

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={onChange} value={credential.password} minLength={3} required />

          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" id="cpassword" name="cpassword" onChange={onChange} value={credential.cpassword} minLength={3} required/>

          {passwordMatchError && <div className="error-message" style={{color:"red"}}>Passwords do not match</div>}
          {!userchecker && <div className="error-message" style={{color:"green"}}>User already exist</div>}
          <button type='submit'><span className='logoli'><i class="fa-solid fa-user-check"></i></span>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;