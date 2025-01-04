import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
 name: "request",
 initialState: null,
 reducers: {
  addRequest: (state, action) => {
   return action.payload;
  },
  removeRequest: (state, action) => {

   const newUser = state.filter((e) => {
    return e._id != action.payload;
   })
   return newUser
  }
 }
})

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;