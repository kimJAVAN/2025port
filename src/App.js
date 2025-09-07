import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Main from "./Route/Main/Main.jsx";
import Header from "./Component/Header/Header";
import SubPortfolio from "./Route/Portfolio/PortFolioRoute.jsx";
import SubContact from "./Route/Contact/SubContact.jsx";
import './reset.css';
import AOS from "aos";
import "aos/dist/aos.css";

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/portfolio" element={<SubPortfolio />} />
        <Route path="/contact" element={<SubContact />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router basename="/2025port">
      <AppContent />
    </Router>
  );
}

export default App;
