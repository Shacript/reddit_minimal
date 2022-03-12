const API_ROOT = "https://www.reddit.com";

export const getSubreddits = async () => {
  const response = await fetch(`${API_ROOT}/subreddits.json`);
  const json = await response.json();
  return {
    subreddits: json.data.children.map((subreddit) => subreddit.data),
    after: json.data.after || null,
  };
};

export const getSubredditsWithParams = async (next_count, next_after) => {
  const response = await fetch(
    `${API_ROOT}/subreddits.json?count=${next_count}&after=${next_after}`
  );
  const json = await response.json();
  return {
    subreddits: json.data.children.map((subreddit) => subreddit.data),
    after: json.data.after || null,
  };
};

export const getSubredditPost = async (subreddit) => {
  const response = await fetch(`${API_ROOT}/${subreddit}.json`);
  const json = await response.json();
  return {
    posts: json.data.children.map((post) => post.data),
    after: json.data.after || null,
  };
};

export const getSubredditPostWithParams = async (
  subreddit,
  next_count,
  next_after
) => {
  const response = await fetch(
    `${API_ROOT}/${subreddit}.json?count=${next_count}&after=${next_after}`
  );
  const json = await response.json();
  return {
    posts: json.data.children.map((post) => post.data),
    after: json.data.after || null,
  };
};

export const getSubredditPostAndComment = async (permalink) => {
  const response = await fetch(`${API_ROOT}/${permalink}.json`);
  const json = await response.json();
  return {
    post: json[0].data.children[0].data,
    comments: json[1].data.children.map((comment) => comment.data),
  };
};
