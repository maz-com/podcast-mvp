import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { Login } from "../components/MyAccount/Login";
import { FavoritesPage } from "../pages/FavoritesPage";

export const MyAccount = ({
  /* handleLogin, */ updateLoginState,
  loggedIn,
}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    requestProfileData();
  }, []);

  const handleLogin = () => {
    requestProfileData();
    updateLoginState();
  };
  const requestProfileData = async () => {
    try {
      const response = await axios("/api/auth/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!loggedIn && <Login handleLogin={handleLogin} />}
      {loggedIn && (
        <FavoritesPage
          userData={userData}
          handleLogout={() => updateLoginState()}
        />
      )}
    </div>
  );
};
