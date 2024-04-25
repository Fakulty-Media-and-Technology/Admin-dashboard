import {
  PayloadAction,
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import userSlice from "./slices/usersSlice";

const middlewares = [
  /* other middlewares */
];

const combinedReducer = combineReducers({
  user: userSlice,
  // orientation: orientationSlice,
  // ... more reducers
});

const rootReducer = (state: any, action: PayloadAction<any>) => {
  if (action.type === "auth/logout") {
    // check for action type
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
