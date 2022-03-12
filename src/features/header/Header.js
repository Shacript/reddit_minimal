import "./Header.css";
import { FaRedditSquare } from "react-icons/fa";

import { useSelector } from "react-redux";

import { selectSelectedSubreddit } from "../../store/subredditSlice";

const Header = () => {
  const selectSubreddit = useSelector(selectSelectedSubreddit);

  return (
    <header>
      <div className="logo">
        <FaRedditSquare
          style={{ color: "var(--color-main)", width: "50px", height: "50px" }}
        />
        <p>
          <span style={{ color: "var(--color-main)" }}>Reddit_</span>Minimal{" "}
          <span style={{ color: "var(--color-main)" }}>{selectSubreddit}</span>
        </p>
      </div>
    </header>
  );
};

export default Header;
