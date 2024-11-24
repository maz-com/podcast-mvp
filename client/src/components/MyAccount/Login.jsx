import { useState } from "react";
//import { Register } from "./Register";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = ({ handleLogin, updateLoginState, loggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //call the useNavigate React hook to get the navigate function
  const navigate = useNavigate();

  /* const handleLogin = () => {
    updateLoginState();
  }; */

  const login = async (event, loggedIn) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            // If sending data in the body, must send header to say what type of data we are sending
            "Content-Type": "application/json",
          },
        }
      );

      console.log(data);
      //store it locally
      localStorage.setItem("token", data.token);
      handleLogin();
      setUsername("");
      setPassword("");
      //navigate back to AdminView
      //navigate("/favorites");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="large-margin">
        <Form>
          <Form.Text>
            <h2>Log in</h2>
          </Form.Text>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              placeholder="Enter username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={login}>
            Submit
          </Button>
        </Form>
        <Form.Text>
          {" "}
          No account? <Link to="/register">Register here</Link>
        </Form.Text>
      </Container>
    </>
  );
};
