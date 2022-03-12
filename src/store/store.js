import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from "./subredditSlice";
import subredditPostsReducer from "./subredditPostsSlice";
import subredditPostReducer from "./subredditPostSlice";

export const store = configureStore({
  reducer: {
    subreddits: subredditsReducer,
    subredditPosts: subredditPostsReducer,
    subredditPost: subredditPostReducer,
  },
});
