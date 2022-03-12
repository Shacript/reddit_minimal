import { createSlice } from "@reduxjs/toolkit";
import { getSubredditPost, getSubredditPostWithParams } from "../api/reddit";

const initialState = {
  after: "",
  count: 0,
  posts: [],
  isError: false,
  isLoading: false,
  isNextError: false,
  isNextLoading: false,
  searchTerm: "",
  selectedSubreddit: "",
};

const subredditPostsSlice = createSlice({
  name: "subredditPosts",
  initialState,
  reducers: {
    startGetSubredditPosts(state) {
      state.isLoading = true;
      state.isError = false;
    },
    getSubredditPostsSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.count = 0;
      state.posts = action.payload.posts;
      state.after = action.payload.count;
      state.count += 25;
    },
    getSubredditPostsFailed(state) {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const {
  startGetSubredditPosts,
  getSubredditPostsSuccess,
  getSubredditPostsFailed,
} = subredditPostsSlice.actions;

export default subredditPostsSlice.reducer;

export const selectSubreddit = (state) => state.subredditPosts

export const fetchSubredditPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(startGetSubredditPosts());
    const response = await getSubredditPost(subreddit);
    dispatch(getSubredditPostsSuccess(response));
  } catch (err) {
    dispatch(getSubredditPostsFailed());
  }
};
