import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Route/Main/Main.jsx";
import Header from "./Component/Header/Header";
import './reset.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/2025port" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
