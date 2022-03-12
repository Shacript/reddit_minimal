import { createSlice } from "@reduxjs/toolkit";
import { getSubredditPostAndComment } from "../api/reddit";

const initialState = {
  isLoading: false,
  isError: false,
  post: {},
  comments: [],
};

const subredditPostSlice = createSlice({
  name: "subredditPost",
  initialState,
  reducers: {
    startGetSubredditPost(state) {
      state.isLoading = true;
      state.isError = false;
    },
    getSubredditPostSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.post = action.payload.post;
      state.comments = action.payload.comments;
    },
    getSubredditPostFailed(state) {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const {
  startGetSubredditPost,
  getSubredditPostSuccess,
  getSubredditPostFailed,
} = subredditPostSlice.actions;

export default subredditPostSlice.reducer;

export const selectSubredditPost = (state) => state.subredditPost;

export const fetchSubredditPostAndComments =
  (permalink) => async (dispatch) => {
    try {
      dispatch(startGetSubredditPost());
      const response = await getSubredditPostAndComment(permalink);
      dispatch(getSubredditPostSuccess(response));
    } catch (err) {
      dispatch(getSubredditPostFailed());
    }
  };
