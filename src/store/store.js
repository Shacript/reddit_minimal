import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from "./subredditSlice";

export const store = configureStore({
  reducer: {
    subreddits: subredditsReducer,
  },
});
