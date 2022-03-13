import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDoubleDown, FaRedoAlt } from "react-icons/fa";

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

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

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
    return (
      <SkeletonTheme
        baseColor="var(--color-mid)"
        highlightColor="var(--color-light)"
      >
        <div className="postsPage">
          <div className="postsPage-header-loading">
            <Skeleton />
          </div>
          <div className="post-list">
            <PostsLoading />
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  if (subreddit.isError) {
    return (
      <div className="postsPage">
        <div className="postsPage-header-loading">
          Oops! Something went wrong.
        </div>
        <div className="post-list">
          <div
            className="post load-btn"
            onClick={() => dispatch(fetchSubredditPosts(selectedSubreddit))}
          >
            <div className="post-title" style={{ marginBottom: "0" }}>
              <FaRedoAlt /> Failed to load ... Click here to try again.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="postsPage">
      <div className="postsPage-header">
        <SearchBar />
      </div>
      <div className="post-list">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <Post post={post} clickToNavigate={true} key={i} />
          ))
        ) : (
          <div className="post">
            <div className="post-title" style={{ marginBottom: "0" }}>
              :( No posts matching &quot;{subreddit.searchTerm}&quot;
            </div>
          </div>
        )}
        {subreddit.after && !subreddit.isNextLoading && posts.length > 0 ? (
          <div className="post load-btn" onClick={onNextHandler}>
            <div className="post-title" style={{ marginBottom: "0" }}>
              <FaAngleDoubleDown /> Load more...
            </div>
          </div>
        ) : (
          subreddit.isNextLoading && <PostsLoading />
        )}
      </div>
    </div>
  );
};

const PostsLoading = () => {
  let loadingArray = [];

  for (let i = 0; i < 5; i++) {
    loadingArray.push(
      <div className="post">
        <Skeleton style={{ width: "10em" }} />
        <div className="post-title" style={{ marginBottom: "0" }}>
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <SkeletonTheme
      baseColor="var(--color-mid)"
      highlightColor="var(--color-light)"
    >
      {loadingArray}
    </SkeletonTheme>
  );
};

export default PostsPage;
