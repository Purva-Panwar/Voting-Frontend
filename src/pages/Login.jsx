import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { voteActions } from "../store/vote-slice";


const Login = () => {
  const [userData, setUsreData] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState("");

  const [isLoggedin, setIsLoggedin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //man se kiya he
  useEffect(() => {
    dispatch(voteActions.changeCurrentVoter(null));
    localStorage.removeItem("currentUser");
    navigate("/login");
  }, []);

  //function to change controlled inputs
  const changeInputHandler = (e) => {
    setUsreData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };


  const loginVoter = async (e) => {
    e.preventDefault();
    //email
    axios.defaults.withCredentials = true;

    //email
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/voters/login`,
        userData
      );
      const newVoter = await response.data;

      //save new voter in local storage and update in redux store
      localStorage.setItem("currentUser", JSON.stringify(newVoter));
      dispatch(voteActions.changeCurrentVoter(newVoter));
      setIsLoggedin(true);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <section className="register login">
        <p className="nav_logo head">
          {/* <h1>E-VoteHub</h1> */}
          <img
            src="https://cdn-icons-png.flaticon.com/128/8487/8487642.png"
            alt=""
          />
          e-Votehub
        </p>
        <div className="container register_container">
          <h2>Sign In</h2>
          <form onSubmit={loginVoter}>
            {error && <p className="form_error-message">{error}</p>}

            {/* <p className="form_error-message">Any error from the backend</p> */}

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={changeInputHandler}
              autoComplete="true"
              autoFocus
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={changeInputHandler}
              autoComplete="true"
            />

            <p className="">
              <Link to="/reset-password">Forgot Password</Link>
            </p>

            <p>
              Dont have an account? <Link to="/register">Sign Up</Link>
            </p>

            <button type="submit" className="btn primary">
              Login
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
