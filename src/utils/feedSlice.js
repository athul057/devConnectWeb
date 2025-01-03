import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
 name: "feedSlice",
 initialState: null,
 reducers: {
  getMyFeed: (state, action) => {
   return action.payload;
  },
  removeMyFeed: (state, action) => {
   return null;
  }
 }
})
export const { getMyFeed, removeMYFeed } = feedSlice.actions;
export default feedSlice.reducer;