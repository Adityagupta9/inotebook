import React from 'react';
import { Link } from 'react-router-dom';
import '../style/navbar.css';
import { useNavigate  } from 'react-router-dom'

function Navbar() {
  let navigate = useNavigate();
  const handelLogout=()=>{
    localStorage.removeItem('token')
    navigate("/login")
  }
  return (
    <div>
      <nav className='nav'>
        <ul>
          <li><Link className="navlink" to="/">Home</Link></li>
          <li><Link className="navlink" to="/about">About</Link></li>
          {!localStorage.getItem('token') ? (
            <>
              <li><Link to="/login"><button className='butlosi'>Login</button></Link></li>
              <li><Link to="/signup"><button className='butlosi'>Signup</button></Link></li>
            </>) : (<li><button className='butlog' onClick={handelLogout}><i class="fa-solid fa-right-from-bracket"></i> Logout</button></li>)
          }
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
