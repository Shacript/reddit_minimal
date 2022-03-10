import React , { useEffect } from "react";
import { Link , Routes , Route } from "react-router-dom"
import "./App.css";
import { getSubreddits, getSubredditsWithParams } from "./api/reddit"

import Header from "./features/header/Header"
import HomePage from "./containers/homePage/HomePage"

function App() {

  useEffect(() => {

  },[])

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />}/>
        </Routes>
      </main>
      <aside>
        <h1>Subreddits</h1>
      </aside>
    </div>
  );
}

export default App;
