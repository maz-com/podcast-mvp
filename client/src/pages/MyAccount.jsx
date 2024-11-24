import { Outlet } from "react-router-dom";
import { Login } from "../components/MyAccount/Login";
import { FavoritesPage } from "../pages/FavoritesPage";

export const MyAccount = ({
  handleLogin,
  handleLogout,
  //updateLoginState,
  //passLoginState,
  loggedIn,
  userData,
}) => {
  /* const updateLoginState = () => {
    passLoginState();
  }; */
  return (
    <div>
      {!loggedIn && <Login loggedIn={loggedIn} handleLogin={handleLogin} />}
      {loggedIn && (
        <FavoritesPage
          userData={userData}
          loggedIn={loggedIn}
          handleLogout={() => handleLogout()}
        />
      )}
    </div>
  );
};
