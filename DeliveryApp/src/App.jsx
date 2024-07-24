import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./screens/Signup";
import Login from "./screens/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
