import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import PostsPage from "./containers/PostsPage/PostsPage";

import Header from "./features/header/Header";
import Subreddits from "./features/subreddits/Subreddits";

function App() {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PostsPage />} />
        </Routes>
      </main>
      <aside>
        <Subreddits />
      </aside>
    </div>
  );
}

export default App;
