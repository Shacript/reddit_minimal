import { createSlice } from "@reduxjs/toolkit";
import { getSubreddits, getSubredditsWithParams } from "../api/reddit";

const initialState = {
  after: "",
  count: 0,
  subreddits: [],
  isError: false,
  isLoading: false,
  isNextError: false,
  isNextLoading: false,
};

const subredditsSlice = createSlice({
  name: "subreddits",
  initialState,
  reducers: {
    startGetSubreddit(state) {
      state.isLoading = true;
      state.isError = false;
    },
    getSubredditsSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.count = 0; // prevent them from infinity increase when use hot reload
      state.subreddits = action.payload.subreddits;
      state.after = action.payload.after;
      state.count += 25;
    },
    getSubredditsFailed(state) {
      state.isLoading = false;
      state.isError = true;
    },
    startGetNextSubreddits(state) {
      state.isNextLoading = true;
      state.isNextError = false;
    },
    getNextSubredditsSuccess(state, action) {
      state.isNextLoading = false;
      state.isNextError = false;
      state.subreddits = state.subreddits.concat(action.payload.subreddits);
      state.after = action.payload.after;
      state.count += 25;
    },
    getNextSubredditsFailed(state) {
      state.isNextLoading = false;
      state.isNextError = true;
    },
  },
});

export const {
  startGetSubreddit,
  getSubredditsSuccess,
  getSubredditsFailed,
  startGetNextSubreddits,
  getNextSubredditsSuccess,
  getNextSubredditsFailed,
} = subredditsSlice.actions;

export default subredditsSlice.reducer;

export const fetchSubreddits = () => async (dispatch) => {
  try {
    dispatch(startGetSubreddit());
    const response = await getSubreddits();
    dispatch(getSubredditsSuccess(response));
  } catch (err) {
    dispatch(getSubredditsFailed());
  }
};

export const fetchNextSubreddits = (count, after) => async (dispatch) => {
  try {
    dispatch(startGetNextSubreddits());
    const response = await getSubredditsWithParams(count, after);
    dispatch(getNextSubredditsSuccess(response));
  } catch (err) {
    dispatch(getNextSubredditsFailed());
  }
};

export const selectSubreddits = (state) => state.subreddits;
