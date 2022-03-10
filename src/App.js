import React , { useEffect } from "react";
import { Routes , Route } from "react-router-dom"
import "./App.css";

import HomePage from "./containers/homePage/HomePage"

import Header from "./features/header/Header"
import Subreddits from "./features/subreddits/Subreddits"

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
        <Subreddits />
      </aside>
    </div>
  );
}

export default App;
