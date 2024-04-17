// import React from 'react'
import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import Home from './home'
import axios from 'axios';
// import "../App.css";
import "./signup.css"

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
      // console.log(<response className="data"></response>, "response");
      console.log(response.data.userDetails,"response");
      setData(response.data.userDetails);
      let response1 = await axios.post("http://localhost:3000/checkout",{username: username});
      console.log("Checkout response ",response1.data.checkout_details);

      let response2 = await axios.post("http://localhost:3000/addcart",{username: username});
      console.log("Checkout response ",response2.data.cart_details)
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
    <div className="signup">
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSignUp}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input type="text" className="form-control mt-1" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input type="password" className="form-control mt-1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input type="Email" className="form-control mt-1" placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
          </div>
          <div className="form-group mt-3">
            <label>Phone no.</label>
            <input type="number" className="form-control mt-1" placeholder="Phone no." value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
          </div>
          <div className="form-group mt-3">
            <label>Address Line 1</label>
            <input type="text" className="form-control mt-1" placeholder="Address Line 1" value={address1} onChange={(e) => setAddress1(e.target.value)}/>
          </div>
          <div className="form-group mt-3">
            <label>Address Line 2</label>
            <input type="text" className="form-control mt-1" placeholder="Address Line 2 (Optional)" value={address2} onChange={(e) => setAddress2(e.target.value)}/>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">Signup</button>
          </div>
          
        </div>
      </form>
    </div>
    </div>
  )
}

export default SignUp