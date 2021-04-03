import Button from "../smallerComponents/Button";
import LandingNavbar from "../smallerComponents/LandingNavbar";
import Input from "../smallerComponents/Input";

import { connect } from "react-redux";
import axios from "axios";
import { startLoading, stopLoading, showAlert } from "../../actions/index";
import "./Signup.css";
import { Link, NavLink, useHistory } from "react-router-dom";
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
  showAlert: showAlert,
};

const Signup = (props) => {
  const history = useHistory();

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
    props.startLoading();
    if (signupData.password1 === signupData.password2) {
      let data = {
        ...signupData,
        password: signupData.password1,
        password1: undefined,
        password2: undefined,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/users/`, data)
        .then((res) => {
          console.log(res)
          console.log(res.data.message);
          setSignUpData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password1: "",
            password2: "",
          });
          props.stopLoading();
          props.showAlert(res.data.message + ", You can now login!");
          history.push("/login");
        })
        .catch((error) => {
          props.stopLoading();
          if (error.response) {
            props.showAlert(error.response.data.message);
          } else {
            props.showAlert(error.message + ", Please try again after some time!");
          }
        });
    } else {
      props.showAlert("Passwords do not match!");
      props.stopLoading();
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
                type="email"
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
                placeholder="Enter 10-digit phone number here"
                minLength="10"
                maxLength="10"
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
