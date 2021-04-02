import Button from "../smallerComponents/Button";
import LandingNavbar from "../smallerComponents/LandingNavbar";
import Input from "../smallerComponents/Input";

import { connect } from "react-redux";
import axios from "axios";
import { startLoading, stopLoading, showError } from "../../actions/index";
import "./Signup.css";
import { Link, NavLink } from "react-router-dom";
import googlePlayBadge from "../../assets/images/google-play-badge.png";
import parkingPointLogo from "../../assets/images/parking-point-logo.png";

import { useState } from "react";

const mapStateToProps = (state) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = {
  startLoading: startLoading,
  stopLoading: stopLoading,
  showError: showError,
};

const Signup = (props) => {
  const [signupData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password1: "",
    password2: "",
  });

  const handleInputChange = (e) => {
    setSignUpData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupData);
    if (signupData.password1 === signupData.password2) {
      let data = {
        ...signupData,
        password: signupData.password1,
        password1: undefined,
        password2: undefined,
      };
      props.startLoading();
      axios
        .post("http://localhost:5000/api/users", data)
        .then((res) => {
          if (res.data.success) {
            console.log(res);
            setSignUpData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              password1: "",
              password2: "",
            });
            props.stopLoading();
            window.location.reload(false);
          } else {
            // console.log("failed", response.data.message);
            props.stopLoading();
            alert("Failed to signup.");
          }
        })
        .catch((err) => {
          // console.log(err)
          props.stopLoading();
          alert("Failed to signup.");
        });
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="Signup">
      <main className="main-container">
        <LandingNavbar />
        <div className="main-content">
          <h1>
            Signup <br />
            <span>Parking will never be this easy!</span>
          </h1>
          <p>
            Lets get you setup with a few details,
            <span> Please enter the below fields.</span>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <Input
                type="text"
                name="firstName"
                label="First Name"
                placeholder="Enter first name here"
                minLength="1"
                maxLength="12"
                required
                value={signupData.firstName}
                handleInputChange={handleInputChange}
                autoComplete="off"
              />

              <Input
                type="text"
                name="lastName"
                label="Last Name"
                placeholder="Enter last name here"
                minLength="1"
                maxLength="12"
                required
                value={signupData.lastName}
                handleInputChange={handleInputChange}
                autoComplete="off"
              />

              <Input
                type="text"
                name="email"
                label="Email"
                placeholder="Enter email here"
                minLength="5"
                maxLength="30"
                required
                value={signupData.email}
                handleInputChange={handleInputChange}
                autoComplete="off"
              />

              <Input
                type="text"
                name="phone"
                label="Phone Number"
                placeholder="Enter phone number here"
                minLength="5"
                maxLength="30"
                required
                value={signupData.phone}
                handleInputChange={handleInputChange}
                autoComplete="off"
              />

              <Input
                type="password"
                name="password1"
                label="Password"
                placeholder="Enter password here"
                minLength="6"
                maxLength="10"
                required
                value={signupData.password1}
                handleInputChange={handleInputChange}
                autoComplete="off"
              />

              <Input
                type="password"
                name="password2"
                label="Confirm Password"
                placeholder="Enter password again here"
                minLength="6"
                maxLength="10"
                required
                value={signupData.password2}
                handleInputChange={handleInputChange}
                autoComplete="off"
              />
            </div>
            <Button buttonType="pri-btn">Signup</Button>
          </form>
          <div className="alt">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
