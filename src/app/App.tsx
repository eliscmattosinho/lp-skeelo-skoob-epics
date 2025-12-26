import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScreenProvider } from "@/contexts/ScreenContext";
import LandingPage from "@/pages/LandingPage";

export default function App() {
  return (
    <ScreenProvider>
      <BrowserRouter basename="/lp-skeelo-skoob-epics/">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ScreenProvider>
  );
}
