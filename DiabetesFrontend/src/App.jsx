import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
