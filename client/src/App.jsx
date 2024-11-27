import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { SearchPage } from "./pages/SearchPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { MyAccount } from "./pages/MyAccount";
import { Register } from "./components/MyAccount/Register";
import { Login } from "./components/MyAccount/Login";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  //track if user is logged in or not
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  console.log("logged in? " + loggedIn);

  const updateLoginState = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <div>
      <NavBar loggedIn={loggedIn} />
      <Link to="/"></Link>

      <Routes>
        <Route path="/" element={<SearchPage />} />

        <Route
          path="/auth"
          element={
            <MyAccount
              loggedIn={loggedIn}
              updateLoginState={() => updateLoginState()}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
