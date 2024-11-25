import axios from "axios";
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
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  console.log("logged in? " + loggedIn);
  const [userData, setUserData] = useState(null);

  const requestProfileData = async () => {
    try {
      const response = await axios("/api/auth/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log("response.data in function: " + response.data);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    setLoggedIn(!loggedIn);
    requestProfileData();
  };

  const handleLogout = () => {
    setLoggedIn(!loggedIn);
    setUserData(null);
  };

  return (
    <div>
      <NavBar />
      {/* <SearchPage />
      <FavoritesPage /> */}
      <Link to="/"></Link>

      <Routes>
        <Route
          path="/"
          element={<SearchPage userData={userData} loggedIn={loggedIn} />}
        />

        <Route
          path="/auth"
          element={
            <MyAccount
              userData={userData}
              loggedIn={loggedIn}
              handleLogout={() => handleLogout()}
              handleLogin={() => handleLogin()}
              updateUserData={() => requestProfileData()}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              userData={userData}
              loggedIn={loggedIn}
              updateUserData={() => updateUserData()}
              handleLogout={() => handleLogout()}
            />
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
