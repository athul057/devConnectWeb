import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeItem } from '../utils/cartSlice';
import { removeMyFeed } from '../utils/feedSlice';

const Card = ({ user }) => {

  const dispatch = useDispatch();

  console.log(user);
  const { firstName, lastName, photoUrl, age, gender, about, _id } = user;


  const fetchReview = async (status, _id) => {

    try {
      const review = await axios.post(`http://localhost:3000/request/send/${status}/${_id}`, {}, {
        withCredentials: true
      })
      dispatch(removeMyFeed(_id))
      console.log(review)
    } catch (error) {
      console.log(error)
    }

  }
  return (

    <div className="card bg-base-300 w-96 shadow-xl">

      <div className="avatar flex justify-center mt-4">
        <div className="w-44 rounded">
          <img src={photoUrl} />
        </div>
      </div>
      <div className="card-body items-center">
        <h2 className="card-title">{firstName} {lastName}</h2>
        {age && gender && <h1>{age} {gender}</h1>}
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => fetchReview("ignored", _id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={() => fetchReview("intrested", _id)}>Intrest</button>
        </div>
      </div>
    </div>

  )
}

export default Card