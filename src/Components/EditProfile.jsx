import axios from 'axios';
import React, { useState } from 'react'
import Card from './Card';
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';
import EditPreview from './EditPreview';

const EditProfile = ({ user }) => {
 console.log(user)
 const { firstName, lastName, age, gender, about, photoUrl } = user;
 const [fName, setFName] = useState(firstName);
 const [lName, setLName] = useState(lastName);
 const [userAge, setUserAge] = useState(age);
 const [userGender, setUserGender] = useState(gender);
 const [userAbout, setUserAbout] = useState(about);
 const [photo, setPhoto] = useState(photoUrl);
 const [error, setError] = useState("");

 const dispatch = useDispatch();

 const handleEditProfile = async () => {

  try {
   const data = await axios.patch("http://localhost:3000/profile/edit", { firstName: fName, lastName: lName, about: userAbout, age: userAge, gender: userGender, photoUrl: photo }, { withCredentials: true })
   dispatch(addItem({ firstName: fName, lastName: lName, about: userAbout, age: userAge, gender: userGender, photoUrl: photo }))

  } catch (error) {
   console.log("error is " + error);
   // setError(error.response.dat 
  }
 }
 return (
  <>
   <div className='flex mt-12 mx-8 '>
    <div className=" flex justify-center align-middle mr-20">
     <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
       <h2 className="card-title justify-center">EDIT PROFILE</h2>
       <p className='text-red-300'>{error}</p>
       <div className="my-3">
        <label className="form-control w-full max-w-xs">
         <div className="label">
          <span className="label-text">FirstName</span>
         </div>
         <input value={fName} onChange={(e) => setFName(e.target.value)} type="text" className="input input-bordered w-full max-w-xs" />

        </label>
        <label className="form-control w-full max-w-xs">
         <div className="label">
          <span className="label-text">LastName</span>
         </div>

         <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} className="input input-bordered w-full max-w-xs" />

        </label>
        <label className="form-control w-full max-w-xs">
         <div className="label">
          <span className="label-text">Age</span>
         </div>

         <input value={userAge} onChange={(e) => setUserAge(e.target.value)} type="text" className="input input-bordered w-full max-w-xs" />

        </label>
        <label className="form-control w-full max-w-xs">
         <div className="label">
          <span className="label-text">Gender</span>
         </div>

         <input value={userGender} onChange={(e) => setUserGender(e.target.value)} type="text" className="input input-bordered w-full max-w-xs" />

        </label>
        <label className="form-control w-full max-w-xs">
         <div className="label">
          <span className="label-text">PhotoUrl</span>
         </div>

         <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} className="input input-bordered w-full max-w-xs" />

        </label>
        <label className="form-control w-full max-w-xs">
         <div className="label">
          <span className="label-text">About</span>
         </div>

         <textarea value={userAbout} onChange={(e) => setUserAbout(e.target.value)} className="textarea textarea-bordered" placeholder="Bio"></textarea>

        </label>

       </div>
       {/* <div className="card-actions justify-center">

        <button onClick={handleEditProfile} className="btn btn-secondary">Edit Profile</button>
       </div> */}
      </div>
     </div>
    </div>
    <div className='mt-8 ml-10'>

     <EditPreview user={{ firstName: fName, lastName: lName, photoUrl: photo, age: userAge, about: userAbout, gender: userGender }} />
    </div>

   </div>

  </>
 )
}

export default EditProfile