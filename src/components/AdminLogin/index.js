import { useState } from "react";
import "./AdminLogin.css";
import { Link } from "react-router-dom";
import { showAlert, startLoading, stopLoading } from "../../actions/index";
import { connect } from "react-redux";
import axios from "axios";

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  showAlert: showAlert,
  startLoading: startLoading,
  stopLoading: stopLoading,
};

const AdminLogin = (props) => {
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
    axios.post(`http://localhost:5000/api/admins/signin`, signinData).then(
      (response) => {
        if (response.data.success) {
          console.log("pass", response.data);
          localStorage.setItem("token", response.data.token);
          window.location.reload(false);
        } else {
          console.log("failed", response.data.message);
          alert("Failed to signin.");
        }
      },
      (error) => {
        console.log("Error", error);
        alert("Error occured!");
      }
    );
  };

  return (
    <div className="AdminSignin">
      <form onSubmit={handleSubmit}>
        <h1>ADMIN LOGIN</h1>
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
        <input className="submit-btn" type="submit" value="Login As Admin" />
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
