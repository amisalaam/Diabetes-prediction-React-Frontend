import Login from "./containers/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./containers/Register";
import Home from "./containers/Home";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
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
