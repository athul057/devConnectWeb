import { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const [loginError, setLoginError] = useState("");
 const [emailId, setEmailId] = useState("luffy@mail.com");
 const [password, setPassword] = useState("Luffy@123");

 //I  have to pass with credentilas=true to get my cookie and store it in my webbrowser other wise browser won't store the cookie in to the browser......
 const handleLogin = async () => {

  try {

   const resp = await axios.post("http://localhost:3000/login", {
    emailId, password
   }, {
    withCredentials: true
   });

   dispatch(addItem(resp.data.user));
   navigate("/")

  } catch (error) {
   setLoginError(error?.response?.data || "Login error.");

  }


 }
 return (
  <div>
   <h1 className="card-title justify-begin mt-4 ml-4">DevConnect</h1>
   <div className=" flex justify-center align-middle">
    <div className="card bg-base-100 w-96 shadow-xl">
     <div className="card-body">
      <h2 className="card-title justify-center">LogIn</h2>
      <div className="my-3">
       <label className="form-control w-full max-w-xs">
        <div className="label">
         <span className="label-text">Email</span>
        </div>
        <input type="text" value={emailId} className="input input-bordered w-full max-w-xs" onChange={(e) => setEmailId(e.target.value)} />

       </label>
       <label className="form-control w-full max-w-xs">
        <div className="label">
         <span className="label-text">Password</span>
        </div>

        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full max-w-xs" />

       </label>
      </div>
      <p>Not a user <Link to="/signup" className="text-blue-600 hover:text-blue-900">Signup</Link> ?</p>
      <p className="text-red-300">{loginError}</p>
      <div className="card-actions justify-center">

       <button onClick={handleLogin} className="btn btn-primary">Login</button>
      </div>
     </div>
    </div>
   </div>
  </div>


 )
}
export default Login;