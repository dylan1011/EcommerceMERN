// import React from 'react'
import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import Home from './home'
import axios from 'axios';
import "../App.css";

const SignUp = () => {
  const [data, setData] = useState([]);
  const [username,setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailId, setEmailId] =useState("");
  const [phoneNo, setPhoneNo] =useState("");
  const [address1, setAddress1] =useState("");
  const [address2, setAddress2] = useState("");
//   const [err, setErr] = useState(false);
  let navigate = useNavigate();

  const handleSignUp = async(e) => {
    e.preventDefault();
    let body ={
      username: username,
      password: password,
      emailId : emailId,
      phoneNo : phoneNo,
      address1 : address1,
      address2 : address2,
    }
    try{
      const response = await axios.post("http://localhost:3000/users/signup",body);
    //   const user = response.data.userDetails;
      console.log(<response className="data"></response>, "response");
      console.log(response.data.userDetails);
      setData(response.data.userDetails);
    //   const username = response.data.userDetails;
    //   console.log(username)
    //   localStorage.setItem('user',userDetails);
    //   localStorage.setItem('username',username);

    //   setToken(user);
      navigate('/users/login');
    } catch(error){
      console.error('signup Failed', error);
    //   setErr(true)
    }
  }
  return (
    <>
    {/* <div className='body'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <br/><input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br/><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br/><input type="email" placeholder="Emailid" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
        <br/><input type="number" placeholder="Phone No" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
        <br/><input type="text" placeholder="Address Line 1" value={address1} onChange={(e) => setAddress1(e.target.value)} />
        <br/><input type="text" placeholder="Address Line 2" value={address2} onChange={(e) => setAddress2(e.target.value)} />
        <br/><button type="submit">Sign Up</button>
        {
        //   err && <div><p>Forgot password ??</p></div>
        }
      </form>
    </div> */}

    
    </>
  )
}

export default SignUp