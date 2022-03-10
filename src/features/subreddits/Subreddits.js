import "./Subreddits.css";

import { useEffect, useState } from "react";
import { getSubreddits, getSubredditsWithParams } from "../../api/reddit";

const Subreddits = () => {
  let [subreddits, setSubreddits] = useState([]);

  useEffect(() => {
    getSubreddits().then((data) => {
      setSubreddits(data.subreddits);
      console.log(data.subreddits);
    });
  }, []);

  return (
    <>
      <h2>Subreddits</h2>
      <ul>
        {subreddits.map((data) => (
          <Subreddit
            key={data.id}
            displayName={data.display_name}
            iconImg={data.icon_img}
          />
        ))}
      </ul>
    </>
  );
};

const Subreddit = (props) => {
  return (
    <li className="subreddit">
      { props.iconImg && <img src={props.iconImg} alt={props.displayName} />}
      {props.displayName}
    </li>
  );
};

export default Subreddits;
