import "./Subreddits.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaReddit, FaAngleDoubleDown } from "react-icons/fa";

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

  if(subreddits.isLoading){
    return(<h1>Loading . . .</h1>)
  }

  return (
    <div className="subreddits">
      <h2>Subreddits</h2>
      <ul>
        {subreddits.subreddits.map((data, i) => (
          <Subreddit
            key={i}
            displayName={data.display_name}
            iconImg={data.icon_img}
            active={data.display_name_prefixed === subreddits.selectedSubreddit}
            subreddit={data.display_name_prefixed}
          />
        ))}
        {subreddits.after && !subreddits.isNextLoading && (
          <li>
            <button onClick={onNextHandler}>
              <FaAngleDoubleDown className="icon" style={{ width: "2em" }} />
              Load more...
            </button>
          </li>
        )}
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

export default Subreddits;
