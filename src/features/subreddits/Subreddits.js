import "./Subreddits.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaReddit, FaAngleDoubleDown } from "react-icons/fa";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import FadeIn from "react-fade-in";

import {
  fetchSubreddits,
  fetchNextSubreddits,
  selectSubreddits,
} from "../../store/subredditSlice";

import { fetchSubredditPosts } from "../../store/subredditPostsSlice";

const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const onNextHandler = () => {
    dispatch(fetchNextSubreddits(subreddits.count, subreddits.after));
  };

  if (subreddits.isLoading) {
    return (
      <div className="subreddits">
        <h2>Subreddits</h2>
        <ul>
          <LoadingSubreddit />
        </ul>
      </div>
    );
  }

  return (
    <div className="subreddits">
      <h2>Subreddits</h2>
      <ul>
        <FadeIn>
          {subreddits.subreddits.map((data, i) => (
            <Subreddit
              key={i}
              displayName={data.display_name}
              iconImg={data.icon_img}
              active={
                data.display_name_prefixed === subreddits.selectedSubreddit
              }
              subreddit={data.display_name_prefixed}
            />
          ))}
          {subreddits.after && !subreddits.isNextLoading ? (
            <li>
              <button onClick={onNextHandler}>
                <FaAngleDoubleDown className="icon" style={{ width: "2em" }} />
                Load more...
              </button>
            </li>
          ) : (
            subreddits.isNextLoading && <LoadingSubreddit />
          )}
        </FadeIn>
      </ul>
    </div>
  );
};

const Subreddit = (props) => {
  const dispatch = useDispatch();

  return (
    <li>
      <button onClick={() => dispatch(fetchSubredditPosts(props.subreddit))}>
        {props.iconImg ? (
          <img className="icon" src={props.iconImg} alt={props.displayName} />
        ) : (
          <FaReddit className="icon" style={{ width: "2em" }} />
        )}
        <span className={props.active ? "active" : ""}>
          {props.displayName}
        </span>
      </button>
    </li>
  );
};

const LoadingSubreddit = () => {
  let loadingArray = [];

  for (let i = 0; i < 25; i++) {
    loadingArray.push(
      <li>
        <Skeleton />
      </li>
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

export default Subreddits;
