import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./route/Main/Main";
import Header from "./component/Header/Header";
import './reset.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
