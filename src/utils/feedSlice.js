import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
 name: "feedSlice",
 initialState: null,
 reducers: {
  getMyFeed: (state, action) => {
   return action.payload;
  },
  removeMyFeed: (state, action) => {
   const newArr = state.filter((r) => {
    return r._id !== action.payload
   })
   return newArr;
  }
 }
})
export const { getMyFeed, removeMyFeed } = feedSlice.actions;
export default feedSlice.reducer;