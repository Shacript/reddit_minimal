import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import Post from "../../features/post/post";

import {
  selectSubredditPost,
  fetchSubredditPostAndComments,
} from "../../store/subredditPostSlice";

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
    return <h1>Still loading !</h1>;
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

export default PostsPage;
