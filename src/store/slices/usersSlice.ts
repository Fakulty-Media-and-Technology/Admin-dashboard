import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface User {
  showAcc: boolean;
}

// Define the initial state using that type
const initialState: User = {
  showAcc: false,
};

const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setShowAcc: (state, action) => {
      state.showAcc = action.payload;
    },
    // setCredentialsEmail: (state, action) => {
    //   state.userInfo.email = action.payload;
    // },
    // logout: (state, action) => {
    //   state.userInfo = {
    //     _id: '',
    //     fullname: '',
    //     email: '',
    //     password: '',
    //   };
    // },
  },
});

export const { setShowAcc } = userSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectShowAcc = (state: RootState) => state.user.showAcc;

export default userSlice.reducer;
