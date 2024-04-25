import type { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import store from "./store";

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore["dispatch"];

// Suggested Type alias for simple Thunks
export type AppThunkAction<T = void> = ThunkAction<
  T,
  RootState,
  void,
  AnyAction
>;

// Suggested type alias for the 3rd generic argument of `createAsyncThunk`
export type AsyncThunkOptions<Extra = {}> = {
  dispatch: AppDispatch;
  state: RootState;
} & Extra;
