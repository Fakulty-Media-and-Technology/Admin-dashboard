import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProfile } from "@/types/api/profile.types";
// import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface User {
  showAcc: boolean;
  userProfile: IProfile | null;
}

// Define the initial state using that type
const initialState: User = {
  showAcc: false,
  userProfile: null,
};

const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setShowAcc: (state, action) => {
      state.showAcc = action.payload;
    },
    setCredentials: (state, action: PayloadAction<IProfile>) => {
      state.userProfile = action.payload;
    },
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

export const { setShowAcc, setCredentials } = userSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectShowAcc = (state: RootState) => state.user.showAcc;
export const selectUserProfile = (state: RootState) => state.user.userProfile;

export default userSlice.reducer;
