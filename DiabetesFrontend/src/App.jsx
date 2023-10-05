import Login from "./containers/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./containers/Register";
import Home from "./containers/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
