import "./Header.css";
import { FaRedditSquare } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <FaRedditSquare style={{ color: 'var(--color-main)', width: '50px', height: '50px' }} />
        <p><span style={{ color: 'var(--color-main)'}}>Reddit_</span>Minimal</p>
      </div>
    </header>
  );
};

export default Header;
