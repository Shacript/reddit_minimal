import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from "./subredditSlice";
import subredditPostsReducer from "./subredditPostsSlice";

export const store = configureStore({
  reducer: {
    subreddits: subredditsReducer,
    subredditPosts: subredditPostsReducer,
  },
});
