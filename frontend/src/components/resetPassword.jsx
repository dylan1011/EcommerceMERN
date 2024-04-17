import axios from 'axios';
import React, { useState, useMemo, useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './login';

const resetpassword = () => {
// let temp_password = useRef("");
const[temp_password,setTemp_password] = useState("");
const [code, setCode] = useState("");
let temp = useRef("");
const [email,setEmail] = useState("");
const [isVerified, setIsVerified] = useState(true);
const [isalert, setIsAlert] = useState(false);
let navigate = useNavigate();

const handleReset = async (e)=>{
    e.preventDefault();
    try{
        // let body = {
        //     email: email
        // }
        // let response = await axios.post('/resetpassword', body);
        let x = "Hello";
        setCode(x);
        temp.current=x;
        setIsAlert(true);
        console.log("Code ",code);
        // Wont show updated code in alert becuz its still not rendered
        alert(`Your code is ${temp.current}`);
    }catch(err){
        console.log(`Error Occured: ${err}`);
        setIsVerified(false);
    }
}

// const SendAlert = async () =>{
//     if (isalert){
//         alert(Your code is ${code});
//     }
// }
// SendAlert();

const handleVerify = async (e) => {
    e.preventDefault();
    if (temp_password === code){
        navigate('/login');
    }else{
        setIsVerified(false);
    }
}

return(
    <>
        {/* <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleReset}>
                <input type="email" placeholder="Email" onSubmit={handleVerify} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Send Code</button>
            </form>
                {
                code && <div>
                    <form onSubmit={handleVerify}>
                        <input type="text" placeholder="code" value={temp_password} onChange={(e) => setTemp_password(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Verify</button>
                    </form>
                    {
                        !isVerified && <div>Code not matched</div>
                    }
                </div>
                }
        </div> */}

        <div className="resetPassword">
        <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleReset}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Reset Password</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input type="email"className="form-control mt-1" placeholder="Enter email"onSubmit={handleReset}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Send Code
            </button>
          </div>
        </div>
      </form>
      {
            code && 
            <form className="Auth-form" onSubmit={handleVerify}>
            <div className="Auth-form-content">
          <div className="form-group mt-3">
            <label>Code</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter Code"
              value={temp_password} onChange={(e) => setTemp_password(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Verify
            </button>
            {
                !isVerified && <div>Code not matched</div>
            }
          </div>
        </div>
        </form>
        }
      
    </div>
        </div>
    </>
)

}
export default resetpassword


//   const [count, setCount] = useState(0);
//   const [rend, setRend] = useState("");

//   // Expensive calculation function
//   const expensiveCalculation = (count) => {
//     console.log("Performing expensive calculation...");
//     return count * 2;
//   };

//   // Memoize the result of the expensive calculation
//   const memoizedResult = useMemo(() => expensiveCalculation(count), [count]);

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <p>Result of expensive calculation: {memoizedResult}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//       <button onClick={()=> setRend("Render")}>Render</button>
//     </div>
//   );
// };