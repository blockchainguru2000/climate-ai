import { useState } from "react";
//import { climate_ai_backend } from 'declarations/climate_ai_backend';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/welcome";
import MainPage from "./pages/MainPage";
import { AuthProvider } from "./auth/authetictae";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/chat" element={<MainPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
