import {createSlice} from "@reduxjs/toolkit";

export const CurrentUserSlice = createSlice({
  name: "blogtor",
  initialState: {
    currentUser: {},
  },
  reducers: {
    setCurrentUser: (state, action) => {
      if (action.payload._id) state.currentUser = action.payload;
    },
  },
});

export const {setCurrentUser: setCurrentUser} = CurrentUserSlice.actions;
export const userSelect = (state) => state.reducer.currentUser;
export default CurrentUserSlice.reducer;
