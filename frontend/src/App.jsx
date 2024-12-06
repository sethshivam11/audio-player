import "./App.css";
import { Routes, Route } from "react-router-dom";
import Program from "./pages/Program";
import Player from "./pages/Player";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Program />} path="/program/:programId" />
      <Route element={<Player />} path="/player/:audioId" />
    </Routes>
  );
}

export default App;
