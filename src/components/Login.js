import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import '../style/login.css';
import { useNavigate  } from 'react-router-dom'
const Login = (props) => {
  let navigate = useNavigate ();
    const [credential,setCredential] = useState({email:"",password:""})
    const [verify,setVerify]=useState(true)
    const handelClick = async(e)=>{
      props.setProgress(30)
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/LoginUser", 
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({email:credential.email,password:credential.password})
            });
            props.setProgress(70)
            const json = await response.json()
            console.log(json)
            if(json.success){
              localStorage.setItem('token',json.authtoken)
              setVerify(true)
              navigate("/")
              props.setProgress(100)
            }
            else{
              setVerify(false)
              props.setProgress(100)
            }
            }
const onChange=(e)=>{
  setVerify(true)

    setCredential({...credential,[e.target.name]:e.target.value})
}
  return (
    <div>
      <form onSubmit={handelClick} >
      <div className='newnoteli'>
      <h2><span className='logoli'><i className="fa-solid fa-user"></i></span>Login</h2>

        <label htmlFor="email"><span className='logoli'><i className="fa-regular fa-envelope"></i></span>Email</label>
        <input type="email" id='email' name='email' onChange={onChange} value={credential.email} required />

        <label htmlFor="password"><span className='logoli'><i className="fa-solid fa-lock"></i></span>Password</label>
        <input type="password" id="password" name="password" onChange={onChange} value={credential.password} minLength={3} required />

        <div className='newuser'><Link to="/signup" style={{ textDecoration: 'none',color:'white' }}>*New User</Link></div>

        <button type='submit'><span className='logoli'><i className="fa-solid fa-user-lock"></i></span>Login</button>
        {!verify && <div style={{color:"red"}}>Invalid email or password</div>}
        
      </div>
      </form>
    </div>
  )
  }

export default Login