import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDoubleDown } from "react-icons/fa";

import Post from "../../features/post/post";

import "./PostsPage.css";

import SearchBar from "../../features/searchBar/SearchBar";

import {
  fetchSubredditPosts,
  fetchNextSubredditPosts,
  selectSubreddit,
  selectFilteredSubredditPosts,
} from "../../store/subredditPostsSlice";

import { selectSelectedSubreddit } from "../../store/subredditSlice";

const PostsPage = () => {
  const subreddit = useSelector(selectSubreddit);
  const posts = useSelector(selectFilteredSubredditPosts);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubredditPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  const onNextHandler = () => {
    dispatch(
      fetchNextSubredditPosts(
        selectedSubreddit,
        subreddit.count,
        subreddit.after
      )
    );
  };

  if (subreddit.isLoading) {
    return <h1>Loading . . . !</h1>;
  }

  return (
    <div className="postsPage">
      <div className="postsPage-header">
        <h2>Posts</h2>
        <SearchBar />
      </div>
      <div className="post-list">
        {posts.map((post, i) => (
          <Post post={post} clickToNavigate={true} key={i} />
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
