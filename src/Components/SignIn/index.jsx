import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../Context/AuthProvider";
import axios from "../../Api/axios";
import { Link } from "react-router-dom";
const LOGIN_URL = "/users/is-available";
const SignIn = () => {
  const [setAuth] = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [listOfUsers, setListOfUsers] = useState([]);
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState();

  const getUsers = async () => {
    const data = await axios.get("/users");
    setListOfUsers(data.data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  console.log(listOfUsers);
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userTaken = listOfUsers.includes(
        (item) => item.name === "alaaRaed"
      );
      console.log(userTaken);
      if (userTaken) {
        alert("User taken");
      } else {
        const response = await axios.post(
          LOGIN_URL,
          JSON.stringify({ email: "nico@gmail.com" }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const data = await axios.get("/users");

      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {}
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
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => {
            setUser(e.target.value);
          }}
          value={user}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPwd(e.target.value);
          }}
          value={pwd}
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
