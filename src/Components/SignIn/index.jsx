import React, { useState, useEffect } from "react";
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState();

  useEffect(() => {}, [email, password]);

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
        setSuccess(true);

        setTimeout(() => {
          navigate("/products");
        }, 700);
      }
    } catch (err) {
      setSuccess(false);
    }
  };
  console.log(success);
  return (
    <Paper
      sx={{
        padding: "3em",
        display: "flex",
        justifyContent: "center",
        width: "fit-content",
        maxWidth: "100%",
        margin: "auto auto",
      }}
    >
      <Stack spacing={8} sx={{ width: "20em" }}>
        {success === true || false ? (
          <Alert severity={success ? "success" : "error"} aria-live="assertive">
            {success ? "You've Successfully Logged In" : "User Does Not Exist"}
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
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
              error={success === undefined || true ? false : true}
            />
            <TextField
              type="password"
              label="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
              error={success === undefined || true ? false : true}
            />
            <Button type="submit">Sign In </Button>
          </Stack>
        </form>
        <p>
          Don't have an Account ? <br />
          <Link style={{ textDecoration: "unset", color: "#1976d2" }} to="/">
            Sign Up
          </Link>
        </p>
      </Stack>
    </Paper>
  );
};

export default SignIn;
