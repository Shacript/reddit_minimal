import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import ReactMarkdown from 'react-markdown';

import { FaCommentDots } from "react-icons/fa";

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
        <div className="post">
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
            <div className="post-selftext-container">
              <ReactMarkdown children={post.selftext} />
            </div>
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
