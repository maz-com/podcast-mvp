import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
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

      setUsername("");
      setPassword("");
      alert("New user has been registered!");
    } catch (error) {
      console.error("User could not be added:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="large-margin">
      <Form onSubmit={registerUser}>
        <Form.Text>
          <h2>Register</h2>
        </Form.Text>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Choose a username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Choose a password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Form.Text>
        {" "}
        Already registered? <Link to="/login">Log in here</Link>
      </Form.Text>
    </Container>
  );
};
