import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { SearchPage } from "./pages/SearchPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { RegisterLogin } from "./pages/RegisterLogin";
import { Register } from "./components/MyAccount/Register";
import { Login } from "./components/MyAccount/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      {/* <SearchPage />
      <FavoritesPage /> */}
      <Link to="/"></Link>

      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/auth" element={<RegisterLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
