import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "../../Api/axios";
import { Link } from "react-router-dom";
const LOGIN_URL = "/auth/login";
const SignIn = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const errRef = useRef();
  console.log(auth);
  const [email, setEmail] = useState("");
  const [listOfUsers, setListOfUsers] = useState([]);
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const getUsers = async () => {
    const data = await axios.get("/users");
    setListOfUsers(data.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  console.log(listOfUsers);

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
        navigate("/home");
      }
      console.log(JSON.stringify(response));
      const access_token = response.data.access_token;
      setAuth({ email, password, access_token });
      setEmail("");
      setPassword("");
    } catch (err) {
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
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
        />
        <button>Sign In </button>
      </form>
      <p>
        Don't have an Account ? <br />
        <span className="line">
          <Link to="/signup">Sign Up </Link>
        </span>
      </p>
    </section>
  );
};

export default SignIn;
