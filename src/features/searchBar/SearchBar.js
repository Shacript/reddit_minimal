import "./SearchBar.css";

import { useDispatch, useSelector } from "react-redux";

import {
  selectSearchTerm,
  setSearchTerm,
} from "../../store/subredditPostsSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  const onSearchTermChanged = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <input
      type="text"
      onChange={onSearchTermChanged}
      placeholder="🌏 Search post here."
      value={searchTerm}
    />
  );
};

export default SearchBar;
