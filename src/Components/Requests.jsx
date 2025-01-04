import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
 const dispatch = useDispatch();
 const requests = useSelector((state) => state.request);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 const reviewRequest = async (status, _id) => {
  try {
   await axios.post(
    `http://localhost:3000/request/review/${status}/${_id}`,
    {},
    { withCredentials: true }
   );
   dispatch(removeRequest(_id));
  } catch (err) {
   console.error("Error reviewing request:", err);
  }
 };

 const fetchRequests = async () => {
  try {
   const { data } = await axios.get(
    "http://localhost:3000/user/requests/received",
    { withCredentials: true }
   );
   dispatch(addRequest(data.data));
   setError(null);
  } catch (err) {
   console.error("Error fetching requests:", err);
   setError("Failed to load requests. Please try again later.");
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchRequests();
 }, []);

 if (loading) {
  return (
   <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-300"></div>
   </div>
  );
 }

 if (error) {
  return (
   <div className="flex justify-center items-center min-h-screen">
    <h1 className="text-red-500 text-xl">{error}</h1>
   </div>
  );
 }

 if (!requests || requests.length === 0) {
  return (
   <div className="flex justify-center items-center min-h-screen">
    <h1 className="text-gray-500 text-2xl font-semibold">No pending requests.</h1>
   </div>
  );
 }

 return (
  <div className="min-h-screen bg-gray-900 p-6">
   <h1 className="text-white text-3xl font-bold text-center mb-6">
    Your Requests
   </h1>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {requests.map((request) => {
     const { firstName, lastName, photoUrl, about, age } = request.fromUserId;
     const { _id } = request;

     return (
      <div
       key={_id}
       className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
      >
       <div className="flex items-center space-x-4">
        <div className="avatar">
         <div className="w-20 h-20 rounded-full border-2 border-gray-500">
          <img
           src={photoUrl}
           alt={`${firstName}'s profile`}
           className="w-full h-full object-cover"
          />
         </div>
        </div>
        <div>
         <h2 className="text-white text-xl font-bold">
          {firstName} {lastName}
         </h2>
         <p className="text-gray-400 text-sm">Age: {age}</p>
        </div>
       </div>
       <div className="mt-4">
        <h3 className="text-gray-300 font-semibold">About</h3>
        <p className="text-gray-400 text-sm">{about}</p>
       </div>
       <div className="mt-6 flex justify-end space-x-4">
        <ActionButton
         onClick={() => reviewRequest("accepted", _id)}
         color="green"
         label="Accept"
        />
        <ActionButton
         onClick={() => reviewRequest("rejected", _id)}
         color="red"
         label="Reject"
        />
       </div>
      </div>
     );
    })}
   </div>
  </div>
 );
};

const ActionButton = ({ onClick, color, label }) => (
 <button
  onClick={onClick}
  className={`px-4 py-2 bg-${color}-500 text-white rounded-lg hover:bg-${color}-600 transition duration-300`}
 >
  {label}
 </button>
);

export default Requests;
