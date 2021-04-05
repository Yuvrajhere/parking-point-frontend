import "./Login.css";

import Button from "../smallerComponents/Button";
import LandingNavbar from "../smallerComponents/LandingNavbar";

import { showAlert, startLoading, stopLoading } from "../../actions/index";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import { useState } from "react";
import Input from "../smallerComponents/Input";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  showAlert: showAlert,
  startLoading: startLoading,
  stopLoading: stopLoading,
};

const Login = (props) => {
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
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/signin`, signinData)
      .then(
        (response) => {
          localStorage.setItem("token", response.data.token);
          props.stopLoading();
          window.location.reload(false);
        },
        (error) => {
          props.stopLoading();
          if (error.response) {
            props.showAlert(error.response.data.message);
          } else {
            props.showAlert(error.message);
          }
        }
      );
  };

  return (
    <div className="Login">
      <main className="main-container">
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
            <div className="form-fields">
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="Enter email here"
                minLength="5"
                maxLength="30"
                required
                value={signinData.email}
                handleInputChange={handleInputChange}
                autoComplete="off"
              />
              <Input
                name="password"
                label="Password"
                type="password"
                placeholder="Enter password here"
                minLength="6"
                maxLength="10"
                required
                value={signinData.password}
                handleInputChange={handleInputChange}
                autoComplete="off"
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
