import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
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
    } catch (error) {
      alert("Log in failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="account-form-container">
      <Container className="large-margin">
        <Form>
          <Form.Text>
            <h2>Log in</h2>
          </Form.Text>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
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

        <Form.Label className="register-login-text">
          {" "}
          No account? <Link to="/register">Register here</Link>
        </Form.Label>
      </Container>
    </div>
  );
};
