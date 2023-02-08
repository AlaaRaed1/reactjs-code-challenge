import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "../../Api/axios";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const SPECIALS = /[*|":!<>[\]{}`\\()';@&$#%^]/;
const SIGNUP_URL = "/users/";
const SignUp = () => {
  const nameRef = useRef();
  const errRef = useRef();
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
        setSuccess(true);
      }

      setSuccess(true);
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
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <FontAwesomeIcon
            icon={faCheck}
            className={validName ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validName || !name ? "hide" : "invalid"}
          />
        </label>
        <input
          type="text"
          id="username"
          ref={nameRef}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
        />
        <p
          id="uidnote"
          className={
            nameFocus && name && !validName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
        <label htmlFor="email">
          Email:
          <FontAwesomeIcon
            icon={faCheck}
            className={validEmail ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validEmail || email ? "hide" : "invalid"}
          />
        </label>
        <input
          type="email"
          id="email"
          ref={nameRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
        />
        <label htmlFor="password">
          Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={validPassword ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPassword || !password ? "hide" : "invalid"}
          />
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          aria-invalid={validPassword ? "false" : "true"}
          aria-describedby="passwordnote"
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <p
          id="passwordnote"
          className={
            passwordFocus && !validPassword ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and not include
          special characters.
          <br />
        </p>

        <label htmlFor="confirm_password">
          Confirm Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={validMatch && matchPassword ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validMatch || !matchPassword ? "hide" : "invalid"}
          />
        </label>
        <input
          type="password"
          id="confirm_password"
          onChange={(e) => setMatchPassword(e.target.value)}
          value={matchPassword}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>

        <button
          disabled={!validName || !validPassword || !validMatch ? true : false}
        >
          Sign Up
        </button>
      </form>
      <p>
        Already have an Account ?
        <br />
        <span className="line">
          <Link to="/">Sign In </Link>
        </span>
      </p>
    </section>
  );
};

export default SignUp;
