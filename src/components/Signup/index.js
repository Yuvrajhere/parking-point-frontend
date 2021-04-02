import Button from "../smallerComponents/Button";
import LandingNavbar from "../smallerComponents/LandingNavbar";

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
      <main>
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
              <div className="form-child">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  autoComplete="off"
                  placeholder="Enter first name here"
                  minLength="1"
                  maxLength="12"
                  required
                  name="firstName"
                  value={signupData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-child">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter last name here"
                  minLength="1"
                  maxLength="12"
                  required
                  name="lastName"
                  value={signupData.lastName}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
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
                  value={signupData.email}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
              <div className="form-child">
                <label htmlFor="phone">Phone number</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter phone number here"
                  minLength="5"
                  maxLength="30"
                  required
                  name="phone"
                  value={signupData.phone}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
              <div className="form-child">
                <label htmlFor="password1">Password</label>
                <input
                  type="password"
                  id="password1"
                  placeholder="Enter password here"
                  minLength="6"
                  maxLength="10"
                  required
                  name="password1"
                  value={signupData.password1}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
              <div className="form-child">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  id="password2"
                  placeholder="Enter password again here"
                  minLength="6"
                  maxLength="10"
                  required
                  name="password2"
                  value={signupData.password2}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
            </div>
            <Button buttonType="pri-btn">Singup</Button>
            {/* <input className="submit-btn" type="submit" value="Signup" /> */}
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
