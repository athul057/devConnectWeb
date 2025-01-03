import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card';
import { getMyFeed } from '../utils/feedSlice';

const Feed = () => {
 const users = useSelector((state) => state.feed)
 const dispatch = useDispatch();

 const getFeedData = async () => {
  try {
   const feedData = await axios.get("http://localhost:3000/feed", {
    withCredentials: true
   })

   dispatch(getMyFeed(feedData.data.data))
  } catch (error) {
   console.log(error);
  }

 }
 useEffect(() => {

  getFeedData();
 }, [])


 return (
  users && (<div className='flex justify-center mt-5'>

   <Card user={users[0]} />
  </div>

  )
 )
}

export default Feed