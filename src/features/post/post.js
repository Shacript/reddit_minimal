import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { FaCommentDots, FaReddit } from "react-icons/fa";

import "./post.css";

import FadeIn from "react-fade-in";

import { LazyLoadImage } from 'react-lazy-load-image-component';

const Post = ({ post, clickToNavigate, linkToRealReddit }) => {
  const navigate = useNavigate();

  return (
    <div
      className="post"
      onClick={clickToNavigate && (() => navigate(post.permalink))}
    >
      <FadeIn>
        <p>
          <span className="main-color">P`</span>osted by{" "}
          <a
            href={`https://www.reddit.com/u/${post.author}`}
            target="_blank"
            rel="noreferrer"
          >
            {post.author}
          </a>
        </p>
        <div className="post-title">{post.title}</div>
        <div className="post-body-container">
          {post.selftext && <ReactMarkdown children={post.selftext} />}
          {post.url.endsWith(".jpg") && (
            <LazyLoadImage src={post.url} className="post-image" alt="" />
          )}
          {post.secure_media && post.secure_media.reddit_video && (
            <video className="post-image" controls>
              <source
                src={post.secure_media.reddit_video.fallback_url}
                type="video/mp4"
              ></source>
            </video>
          )}
          {!post.selftext && !post.url.endsWith(".jpg") && !post.secure_media && (
            <div>
              <h3>This site might be Crossposted</h3>
              <p>That's why we can't make it show here :( sorry.</p>
            </div>
          )}
        </div>
        <div className="post-footer">
          <span>
            <FaCommentDots style={{ marginRight: "5px" }} /> Comment{" "}
            {post.num_comments}
          </span>
          {linkToRealReddit && (
            <a
              href={"https://reddit.com" + post.permalink}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <FaReddit style={{ marginRight: "5px" }} /> Go to Real Reddit
              </span>
            </a>
          )}
        </div>
      </FadeIn>
    </div>
  );
};

export default Post;
