import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCommentDots, FaAngleDoubleDown } from "react-icons/fa";

import "./PostsPage.css";

import SearchBar from "../../features/searchBar/SearchBar";

import {
  fetchSubredditPosts,
  fetchNextSubredditPosts,
  selectSubreddit,
  selectFilteredSubredditPosts,
} from "../../store/subredditPostsSlice";

const PostsPage = () => {
  const subreddit = useSelector(selectSubreddit);
  const posts = useSelector(selectFilteredSubredditPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubredditPosts("/r/home"));
  }, [dispatch]);

  const onNextHandler = () => {
    dispatch(fetchNextSubredditPosts("/r/home",subreddit.count, subreddit.after));
  };

  return (
    <div className="postsPage">
      <div className="postsPage-header">
        <h2>Posts</h2>
        <SearchBar />
      </div>
      <div className="post-list">
        {posts.map((post, i) => (
          <div className="post" key={i}>
            <p>
              Posted by{" "}
              <a
                href={`https://www.reddit.com/u/${post.author}`}
                target="_blank"
                rel="noreferrer"
              >
                {post.author}
              </a>
            </p>
            <div className="post-title">{post.title}</div>
            {post.selftext && (
              <p className="post-selftext-container">{post.selftext}</p>
            )}
            {post.url.endsWith(".jpg") && (
              <div className="post-image-container">
                <img src={post.url} className="post-image" alt="" />
              </div>
            )}
            <div className="post-footer">
              <span>
                <FaCommentDots style={{ marginRight: "5px" }} /> Comment{" "}
                {post.num_comments}
              </span>
            </div>
          </div>
        ))}
        {subreddit.after && (
          <div className="post" onClick={onNextHandler}>
            <div className="post-title" style={{ marginBottom: "0" }}>
              <FaAngleDoubleDown /> Load more...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsPage;
