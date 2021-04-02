import "./Login.css";

import Button from "../smallerComponents/Button";
import LandingNavbar from "../smallerComponents/LandingNavbar";

import { showError, startLoading, stopLoading } from "../../actions/index";
import { connect } from "react-redux";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import googlePlayBadge from "../../assets/images/google-play-badge.png";
import parkingPointLogo from "../../assets/images/parking-point-logo.png";

import { useState } from "react";

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  showError: showError,
  startLoading: startLoading,
  stopLoading: stopLoading,
};

const Login = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setSigninData({
      ...signinData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.startLoading();
    axios.post(`http://localhost:5000/api/users/signin`, signinData).then(
      (response) => {
        if (response.data.success) {
          // console.log("pass", response.data);
          localStorage.setItem("token", response.data.token);
          props.stopLoading();
          window.location.reload(false);
        } else {
          // console.log("failed", response.data.message);
          props.stopLoading();
          alert("Failed to signin.");
        }
      },
      (error) => {
        props.stopLoading();
        // console.log("Error", error);
        alert(error.response.data.message);
      }
    );
  };

  return (
    <div className="Login">
      <main>
        <LandingNavbar />
        <div className="main-content">
          <h1>
            Login <br />
            <span>Great Parkings are waiting for you!</span>
          </h1>
          <p>
            Login to the world of parkings using
            <span> your registered email and password.</span>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-child">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Enter email here"
                minLength="5"
                maxLength="30"
                required
                name="email"
                value={signinData.email}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>
            <div className="form-child">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password here"
                minLength="6"
                maxLength="10"
                required
                name="password"
                value={signinData.password}
                onChange={handleInputChange}
              />
            </div>
            <Button buttonType="pri-btn">Login</Button>
          </form>
          <div className="alt">
            <p>
              Dont have an account? <Link to="/signup">Sign up</Link>
            </p>
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
