import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScreenProvider } from "@/contexts/ScreenContext";
import LandingPage from "@/pages/LandingPage";

function App() {
  return (
    <ScreenProvider>
      <Router basename="/lp-skeelo-skoob-epics">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </ScreenProvider>
  );
}

export default App;
