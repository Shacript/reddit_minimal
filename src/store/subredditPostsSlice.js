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
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    startGetSubredditPosts(state) {
      state.isLoading = true;
      state.isError = false;
    },
    getSubredditPostsSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.count = 0;
      state.posts = action.payload.posts;
      state.after = action.payload.after;
      state.count += 25;
    },
    getSubredditPostsFailed(state) {
      state.isLoading = false;
      state.isError = true;
    },
    startGetNextSubredditPosts(state) {
      state.isNextLoading = true;
      state.isNextError = false;
    },
    getNextSubredditPostsSuccess(state, action) {
      state.isNextLoading = false;
      state.isNextError = false;
      state.posts = state.posts.concat(action.payload.posts);
      state.after = action.payload.after;
      state.count += 25;
    },
    getNextSubredditPostsFailed(state) {
      state.isNextLoading = false;
      state.isNextError = true;
    },
  },
});

export const {
  setSearchTerm,
  startGetSubredditPosts,
  getSubredditPostsSuccess,
  getSubredditPostsFailed,
  startGetNextSubredditPosts,
  getNextSubredditPostsSuccess,
  getNextSubredditPostsFailed,
} = subredditPostsSlice.actions;

export default subredditPostsSlice.reducer;

export const selectSubreddit = (state) => state.subredditPosts;

export const selectSearchTerm = (state) => state.subredditPosts.searchTerm;

export const fetchSubredditPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(startGetSubredditPosts());
    const response = await getSubredditPost(subreddit);
    dispatch(getSubredditPostsSuccess(response));
  } catch (err) {
    dispatch(getSubredditPostsFailed());
  }
};

export const fetchNextSubredditPosts = (subreddit,count, after) => async (dispatch) => {
  try {
    dispatch(startGetNextSubredditPosts());
    const response = await getSubredditPostWithParams(subreddit,count, after);
    dispatch(getNextSubredditPostsSuccess(response));
  } catch (err) {
    dispatch(getNextSubredditPostsFailed());
  }
};

export const selectFilteredSubredditPosts = (state) =>
  state.subredditPosts.posts.filter((post) =>
    post.title.includes(state.subredditPosts.searchTerm)
  );
