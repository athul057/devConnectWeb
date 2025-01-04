import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
 const connections = useSelector((state) => state.connection);
 const dispatch = useDispatch();

 const fetchConnections = async () => {
  try {
   const response = await axios.get(
    "http://localhost:3000/user/requests/connections",
    { withCredentials: true }
   );
   dispatch(addConnection(response.data.data));
  } catch (error) {
   console.error("Error fetching connections:", error);
  }
 };

 useEffect(() => {
  fetchConnections();
 }, []);
 if (!connections) {
  return;
 }

 if (connections.length <= 0) {
  return <h1 className="font-semibold mt-6 text-center text-xl">You don't have any connections....</h1>
 }
 return (
  <div className="mt-6">
   <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
    Connections
   </h1>
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
    {connections?.map((connection, index) => {
     const { firstName, lastName, photoUrl, about } = connection;
     return (
      <div
       key={index}
       className="bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transform transition-all hover:-translate-y-1"
      >
       <div className="p-4 flex items-center">
        <div className="avatar flex-shrink-0">
         <div className="w-16 h-16 rounded-full border-2 border-gray-300 overflow-hidden">
          <img
           src={photoUrl || "https://via.placeholder.com/150"}
           alt={`${firstName} ${lastName}`}
           className="w-full h-full object-cover"
          />
         </div>
        </div>
        <div className="ml-4">
         <h2 className="text-lg font-semibold text-gray-800">
          {firstName} {lastName}
         </h2>
         <p className="text-sm text-gray-500">{about || "No bio available"}</p>
        </div>
       </div>
      </div>
     );
    })}
   </div>
  </div>
 );
};

export default Connections;
