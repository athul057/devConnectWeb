import React from 'react'

const Card = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
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
          <button className="btn btn-primary">Reject</button>
          <button className="btn btn-secondary">Intrested</button>
        </div>
      </div>
    </div>

  )
}

export default Card