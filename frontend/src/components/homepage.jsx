import {useState,useEffect,React} from 'react'
import axios from 'axios';
// import "../App.css";

const home = () => {

  const [data, setData] = useState([]) //manage state of variables or object
  // const username = localStorage.getItem('username');
  useEffect( () => { //called after real and virtual dom are executed.calls the actions.
    const fetchData = async () => {

      const token = localStorage.getItem('token');
      console.log(token);
      if (!token) {
        console.error('Token not found');
        return;
      }

      let headers = {
        authorization: `Bearer ${token}`
      }
      console.log("header ",headers.authorization);
      try {
        console.log("useEffect 2");
        // const response = await axios.get('http://localhost:3000/matchUser/protected/data/matchedList', {headers});
        // const response = await axios.get('http://localhost:3000/user/followers/followerList',{headers});
        // const response = await axios.get('http://localhost:3000/users/profile',{headers});
        const response = await axios.get('http://localhost:3000/profile/user',{headers});



        console.log(response.data, "response");
        console.log(response.data.user_profile, "response");
        setData(response.data.user_profile);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[]); 
  return (
    <div className='body'>
        <p>profile</p><br/>
        {
        // username === "Ken" && <div><p>Hello admin</p></div>
       
    } 
        {/* <div>
        list of matching users
        <select>{data.map((user) => 
            <option key={user._id}>
                {user.profile_name}  
                {user.matching_users}  
            </option>
        )}</select>
        </div>  */}
    </div>
  )
}

export default home






// import React from 'react'


// const homepage = () => {

//   return (
//     <div>
//       <p>Home Page</p>
//     </div>
//   )
// }

// export default homepage
