import React from 'react';

import "../styles/Navigation.css";
import {Link} from "react-router-dom";

const Navigation = ({logged_in, logoutUser}) => {
  return (
    <nav>
      <ul>
        <Link to="/"><li>Home</li></Link>
        <Link to="/Register"><li>Register</li></Link>
        {logged_in ? <Link to='/Login' onClick={logoutUser}><li>Logout</li></Link> : <Link to="/Login"><li>Login</li></Link>}
      </ul>
    </nav>
  )
};

export default Navigation;