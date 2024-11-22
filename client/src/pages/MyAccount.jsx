// import Container from "react-bootstrap/Container";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Login } from "../components/MyAccount/Login";
import { FavoritesPage } from "../pages/FavoritesPage";

export const MyAccount = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn);

  const updateLoginState = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <div>
      {!loggedIn && <Login updateLoginState={() => updateLoginState()} />}
      {loggedIn && (
        <FavoritesPage updateLoginState={() => updateLoginState()} />
      )}
    </div>
  );
};
