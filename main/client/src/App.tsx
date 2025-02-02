import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BalanceProvider } from "../src/components/BalanceContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Game from "./components/Game";
import Wallet from "./components/Wallet";

function App() {
  return (
    <BalanceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </BrowserRouter>
    </BalanceProvider>
  );
}

export default App;
