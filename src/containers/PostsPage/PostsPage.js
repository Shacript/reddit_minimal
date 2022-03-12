import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./PostsPage.css";

import {
  fetchSubredditPosts,
  selectSubreddit,
} from "../../store/subredditPostsSlice";

const PostsPage = () => {
  const subreddit = useSelector(selectSubreddit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubredditPosts("/r/home"));
  }, [dispatch]);

  return (
    <div className="postsPage">
      <h2>Posts</h2>
      <div className="post-list">
        {subreddit.posts.map((post, i) => (
          <div className="post" key={i}>
            <div className="post-title">{post.title}</div>
            {post.url && (
              <div className="post-image-container">
                <img src={post.url} className="post-image" alt="" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
