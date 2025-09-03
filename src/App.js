import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Route/Main/Main.jsx";
import Header from "./Component/Header/Header";
import SubPortfolio from "./Route/Portfolio/PortFolioRoute.jsx";
import './reset.css';

function App() {
  return (
    <Router basename="/2025port"> {/* GitHub Pages 등 배포용 기준 */}
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/portfolio" element={<SubPortfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
