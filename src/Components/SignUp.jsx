import React from 'react'
import { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const [firstName, setFirstName] = useState("");
 const [lastName, setLastName] = useState("");
 const [emailId, setEmailId] = useState("");
 const [password, setPassword] = useState("");


 const handleClick = async () => {
  try {
   const { data } = await axios.post("http://localhost:3000/signup", { firstName, lastName, emailId, password }, {
    withCredentials: true
   })
   console.log(data);
   dispatch(addItem(data.data))
   navigate("/")

  } catch (error) {
   console.log(error)
  }

 }
 return (
  <div>
   <h1 className="card-title justify-begin mt-4 ml-4">DevConnect</h1>
   <div className=" flex justify-center align-middle">
    <div className="card bg-base-100 w-96 shadow-xl">
     <div className="card-body">
      <h2 className="card-title justify-center">SignUp</h2>
      <div className="my-3">
       <label className="form-control w-full max-w-xs">
        <div className="label">
         <span className="label-text">FirstName</span>
        </div>
        <input type="text" value={firstName} className="input input-bordered w-full max-w-xs" onChange={(e) => setFirstName(e.target.value)} />

       </label>
       <label className="form-control w-full max-w-xs">
        <div className="label">
         <span className="label-text">LastName</span>
        </div>
        <input type="text" value={lastName} className="input input-bordered w-full max-w-xs" onChange={(e) => setLastName(e.target.value)} />

       </label>
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
      <p>Already a user? <Link to="/login" className='text-blue-600 hover:text-blue-900'>Login</Link></p>
      <div className="card-actions justify-center">

       <button className="btn btn-primary" onClick={handleClick}>Signup</button>
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default SignUp