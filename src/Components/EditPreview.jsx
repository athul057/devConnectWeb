import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';
import Toast from './Toast';

function EditPreview({ user }) {
 const dispatch = useDispatch();
 const { firstName, lastName, photoUrl, age, gender, about } = user;
 const [toast, setToast] = useState(false);
 const [error, setError] = useState("");

 const handleEditProfile = async () => {

  try {
   const data = await axios.patch("http://localhost:3000/profile/edit", { firstName, lastName, photoUrl, age, gender, about }, { withCredentials: true })
   dispatch(addItem({ firstName, lastName, photoUrl, age, gender, about }))
   setToast(true);
   setError("")
   setTimeout(() => {
    setToast(false);

   }, 3000)
  } catch (error) {
   setError(error.response.data)
  }
 }


 return (
  <>
   {error && <p className='text-red-300'>{error}</p>}
   <div className="card bg-base-300 w-96 shadow-xl">
    {toast && <Toast />}
    <div className="avatar flex justify-center mt-4">
     <div className="w-44 rounded">
      <img src={photoUrl} />
     </div>
    </div>
    <div className="card-body items-center">
     <h2 className="card-title">{firstName} {lastName}</h2>
     {age && gender && <h1>{age} {gender}</h1>}
     <p>{about}</p>
     <div className="card-actions">
      <button onClick={handleEditProfile} className="btn btn-primary">Edit Profile</button>

     </div>
    </div>
   </div>
  </>
 )
}

export default EditPreview