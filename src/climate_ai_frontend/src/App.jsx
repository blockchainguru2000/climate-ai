import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppIntro from "./pagewel";
import MainApp from "./mainp";
import { AuthProvider } from "../loginlogout/auth";
function App() {
  const [greeting, setGreeting] = useState("");

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AppIntro />} />
          <Route path="/search" element={<MainApp />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
