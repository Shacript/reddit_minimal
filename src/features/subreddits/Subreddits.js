import "./Subreddits.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaReddit, FaAngleDoubleDown } from "react-icons/fa";

import {
  fetchSubreddits,
  fetchNextSubreddits,
  selectSubreddits,
} from "../../store/subredditSlice";

const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const onNextHandler = () => {
    dispatch(fetchNextSubreddits(subreddits.count, subreddits.after));
  };

  return (
    <div className="subreddits">
      <h2>Subreddits</h2>
      <ul>
        {subreddits.subreddits.map((data, i) => (
          <Subreddit
            key={i}
            displayName={data.display_name}
            iconImg={data.icon_img}
          />
        ))}
        {subreddits.after && !subreddits.isNextLoading && (
          <li>
            <button onClick={onNextHandler}>
              <FaAngleDoubleDown className="icon" style={{ width: "2em" }} />
              Add More...
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

const Subreddit = (props) => {
  return (
    <li>
      <button>
        {props.iconImg ? (
          <img className="icon" src={props.iconImg} alt={props.displayName} />
        ) : (
          <FaReddit className="icon" style={{ width: "2em" }} />
        )}
        {props.displayName}
      </button>
    </li>
  );
};

export default Subreddits;
