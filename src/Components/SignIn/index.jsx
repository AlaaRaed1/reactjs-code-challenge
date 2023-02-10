import React, { useRef, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "../../Api/axios";
import { Link } from "react-router-dom";
import {
  Stack,
  TextField,
  Paper,
  Button,
  Typography,
  Alert,
} from "@mui/material";
const LOGIN_URL = "/auth/login";
const SignIn = () => {
  const navigate = useNavigate();
  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [listOfUsers, setListOfUsers] = useState([]);
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const getUsers = async () => {
    const data = await axios.get("/users");
    setListOfUsers(data.data);
  };
  console.log(listOfUsers);
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // console.log(listOfUsers);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response) {
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.data.access_token)
        );
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }

      // console.log(JSON.stringify(response));

      setEmail("");
      setPassword("");
    } catch (err) {
      setErrMsg("User Does Not Exist");
    }
  };

  return (
    <Paper
      sx={{
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        margin: "auto 0",
        maxWidth: "15em",
        margin: "auto auto",
      }}
    >
      <Stack spacing={2}>
        {errMsg ? (
          <Alert severity="error" aria-live="assertive">
            {errMsg}
          </Alert>
        ) : (
          ""
        )}

        <Typography variant="h4">Sign In</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="email"
              label="Email"
              size="small"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
              error={errMsg ? true : false}
            />
            <TextField
              type="password"
              label="Password"
              size="small"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
              error={errMsg ? true : false}
            />
            <Button type="submit">Sign In </Button>
          </Stack>
        </form>
        <p>
          Don't have an Account ? <br />
          <Link
            style={{ textDecoration: "unset", color: "#1976d2" }}
            to="/signup"
          >
            Sign Up
          </Link>
        </p>
      </Stack>
    </Paper>
  );
};

export default SignIn;
