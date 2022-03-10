const API_ROOT = "https://www.reddit.com";

export const getSubreddits = async () => {
  const response = await fetch(`${API_ROOT}/subreddits.json`);
  const json = await response.json();
  return {
    posts: json.data.children.map((post) => post.data),
    after: json.data.after || null,
  };
};

export const getSubredditsWithParams = async (next_count, next_after) => {
  const response = await fetch(
    `${API_ROOT}/subreddits.json?count=${next_count}&after=${next_after}`
  );
  const json = await response.json();
  return {
    posts: json.data.children.map((post) => post.data),
    after: json.data.after || null,
  };
};

