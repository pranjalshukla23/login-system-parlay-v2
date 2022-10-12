import { Route, Routes } from "react-router-dom";
import Play from "./Play";
import Home from "./Home";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  console.log("token1", token);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home setToken={setToken} />} />
        <Route path="/play" element={<Play token={token} />} />
      </Routes>
    </>
  );
}

export default App;
