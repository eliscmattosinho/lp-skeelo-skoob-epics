import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/App.css";
import LandingPage from "./pages/LandingPage.js";

function App() {
  return (
    <Router basename="/lp-skeelo-skoob-epics">
      <div className="App">
        <div id="main">
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
