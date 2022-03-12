import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import Post from "../../features/post/post";

import {
  selectSubredditPost,
  fetchSubredditPostAndComments,
} from "../../store/subredditPostSlice";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const PostsPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useDispatch();
  const subredditPost = useSelector(selectSubredditPost);

  const post = subredditPost.post;
  const comments = subredditPost.comments;

  useEffect(() => {
    dispatch(fetchSubredditPostAndComments(params["*"]));
  }, [dispatch, params]);

  if (subredditPost.isLoading || !post.author) {
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
    <>
      <div className="postsPage-header">
        <button onClick={() => navigate("/")}>Go back</button>
        <p>{params["*"]}</p>
      </div>

      <div className="post-list">
        <Post post={post} linkToRealReddit={true} />

        {comments.map((comment, i) => (
          <div className="post" key={i}>
            <div>
              <img src={comment.url} alt="" />
              <a
                href={`https://www.reddit.com/u/${comment.author}`}
                target="_blank"
                rel="noreferrer"
              >
                {comment.author}
              </a>{" "}
              said
            </div>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
    </>
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
