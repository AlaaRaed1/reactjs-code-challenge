import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../../Api/axios";
import {
  Stack,
  TextField,
  Paper,
  Button,
  Typography,
  Alert,
} from "@mui/material";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,24}$/;

const SPECIALS = /[*|":!<>[\]{}`\\()';@&$#%^]/;

const SIGNUP_URL = "/users/";

const SignUp = () => {
  const navigate = useNavigate();

  const [listOfUsers, setListOfUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState();

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [userTaken, setUserTaken] = useState(false);

  // Getting All of the users to see if their is a match

  const getListOfUsers = async () => {
    const response = await axios.get("users");
    setListOfUsers(response.data);
  };

  useEffect(() => {
    getListOfUsers();
  }, [name]);

  /*-------------------------*/

  // Checking if their is a match to alert the user

  useEffect(() => {
    const user_taken = listOfUsers
      .map((item) => item.name.toLowerCase())
      .includes(name);

    if (user_taken) {
      setUserTaken(true);
      setErrMsg("User is taken");
    } else if (!validMatch) {
      setErrMsg("Passwords do not match");
    } else {
      setUserTaken(false);
    }
  }, [name, errMsg, listOfUsers, userTaken, validMatch]);

  /*----------------------------- */

  // Checking if the password is valid

  useEffect(() => {
    if (!SPECIALS.test(password) && PASSWORD_REGEX.test(password)) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }

    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  /*------------------------------- */

  useEffect(() => {
    setErrMsg("");
  }, [name, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!userTaken) {
        localStorage.setItem("access_token", "Signed Up");
        axios.post(
          SIGNUP_URL,
          JSON.stringify({
            name,
            email,
            password,
            avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setErrMsg("");

        navigate("/products");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Sign Up Failed");
      }
    }
  };

  return (
    <Paper
      sx={{
        padding: "3em",
        display: "flex",
        justifyContent: "center",
        width: "fit-content",
        maxWidth: "30em",
        margin: "auto auto",
      }}
    >
      <Stack spacing={2}>
        {errMsg ? (
          <Alert severity={errMsg ? "error" : "success"} aria-live="assertive">
            {errMsg}
          </Alert>
        ) : (
          ""
        )}
        <Typography variant="h4">Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="text"
              label="Username:"
              helperText="4 to 24 characters. You can use Letters, Numbers, and Symbols"
              size="small"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              error={userTaken}
            />

            <TextField
              type="email"
              label="Email:"
              helperText="You can use letters, numbers & periods"
              size="small"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <TextField
              type="password"
              label="Password:"
              helperText="Use 4 or more characters with a mix of (Capital & small) letters and numbers. 
              No symbols allowed."
              size="small"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPassword ? false : true}
            />

            <TextField
              type="password"
              label="Confirm Password:"
              size="small"
              helperText="Confirm your Password"
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              required
              error={!validMatch}
              aria-describedby="confirmnote"
            />

            <Button
              disabled={!validPassword || !validMatch ? true : false}
              type="submit"
            >
              Sign Up
            </Button>
          </Stack>
        </form>
        <p>
          Already have an Account ?
          <br />
          <Link
            to="/signin"
            style={{ textDecoration: "unset", color: "#1976d2" }}
          >
            Sign In
          </Link>
        </p>
      </Stack>
    </Paper>
  );
};

export default SignUp;
