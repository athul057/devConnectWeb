import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
 name: "connection",
 initialState: null,
 reducers: {
  addConnection: (state, action) => {
   return action.payload;
  },
  removeConnection: () => null,
 }
})

export default connectionSlice.reducer;
export const { addConnection, removeConnection } = connectionSlice.actions;