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

  return (
    <div className="postsPage">
      <div className="postsPage-header">
        <SearchBar />
      </div>
      <div className="post-list">
        {posts.map((post, i) => (
          <Post post={post} clickToNavigate={true} key={i} />
        ))}
        {subreddit.after && !subreddit.isNextLoading ? (
          <div className="post" onClick={onNextHandler}>
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
