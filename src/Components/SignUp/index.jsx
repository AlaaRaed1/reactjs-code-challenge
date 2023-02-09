import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "../../Api/axios";
import {
  Stack,
  TextField,
  Paper,
  Button,
  Typography,
  Alert,
  FormHelperText,
} from "@mui/material";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const SPECIALS = /[*|":!<>[\]{}`\\()';@&$#%^]/;

const SIGNUP_URL = "/users/";

const SignUp = () => {
  const nameRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const [listOfUsers, setListOfUsers] = useState([]);

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const getListOfUsers = async () => {
    const response = await axios.get("users");
    setListOfUsers(response.data);
  };
  useEffect(() => {
    nameRef.current.focus();
    getListOfUsers();
    if (success) {
      alert("you are logged in successfully");
    }
  }, [success]);
  console.log(listOfUsers);
  useEffect(() => {
    setValidName(USER_REGEX.test(name));
    setValidEmail(EMAIL_REGEX.test(email));
  }, [name, email]);

  useEffect(() => {
    if (!SPECIALS.test(password) && PASSWORD_REGEX.test(password)) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }

    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [name, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, password);
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(name);
    const v2 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const userTaken = listOfUsers.map((user) => user.name).includes(name);
      const emailTaken = listOfUsers.map((user) => user.email).includes(email);
      if (userTaken) {
        setErrMsg("User is Taken");
      } else if (emailTaken) {
        setErrMsg("Email is Taken");
      } else {
        const response = await axios.post(
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
        setSuccess(true);
        if (response) {
          navigate("/home");
        }
        console.log(response);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Sign Up Failed");
      }
      errRef.current.focus();
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
          <Alert severity={errMsg ? "error" : "success"} aria-live="assertive">
            {errMsg}
          </Alert>
        ) : (
          ""
        )}
        <Typography variant="h5">Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="text"
              label="Username:"
              ref={nameRef}
              size="small"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              aria-invalid={validName ? "false" : "true"}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
            <FormHelperText>
              4 to 24 characters. Must begin with a letter. Letters, numbers,
              underscores, hyphens allowed.
            </FormHelperText>
            <TextField
              type="email"
              label="Email:"
              helperText="You can use letters, numbers & periods"
              ref={nameRef}
              size="small"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />

            <TextField
              type="password"
              label="Password:"
              helperText="Use 4 or more characters with a mix of Capital and small letters and numbers. 
              No symbols allowed"
              size="small"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPassword ? "false" : "true"}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />

            <TextField
              type="password"
              label="Confirm Password:"
              size="small"
              helperText="Confirm your Password"
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />

            <Button
              disabled={
                !validName || !validPassword || !validMatch ? true : false
              }
            >
              Sign Up
            </Button>
          </Stack>
        </form>
        <p>
          Already have an Account ?
          <br />
          <Link to="/" style={{ textDecoration: "unset", color: "#1976d2" }}>
            Sign In
          </Link>
        </p>
      </Stack>
    </Paper>
  );
};

export default SignUp;
