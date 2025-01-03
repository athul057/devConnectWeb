import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useEffect, useState } from "react"
import { addItem } from "../utils/cartSlice"


const Body = () => {

 const [loading, setLoading] = useState(true);
 const dispatch = useDispatch()
 const navigate = useNavigate();
 const fetchUser = async () => {
  try {
   const userInfo = await axios.get("http://localhost:3000/profile/view", {
    withCredentials: true,
   })
   dispatch(addItem(userInfo.data))
  } catch (error) {
   navigate("/login")
  } finally {
   setLoading(false);
  }

 }
 useEffect(() => {
  fetchUser();
 }, [])
 if (loading) {
  return <h1>Loading....</h1>
 }

 return (
  <div>
   <NavBar />
   <Outlet />
  </div>

 )
}

export default Body