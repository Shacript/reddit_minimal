import { Routes, Route } from "react-router-dom";
import "./App.css";

import PostsPage from "./containers/PostsPage/PostsPage";
import PostPage from "./containers/PostPage/PostPage";

import Header from "./features/header/Header";
import Subreddits from "./features/subreddits/Subreddits";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path={"/"} element={<PostsPage />} />
          <Route path={"/*"} element={<PostPage />} />
        </Routes>
      </main>
      <aside>
        <Subreddits />
      </aside>
    </div>
  );
}

export default App;
