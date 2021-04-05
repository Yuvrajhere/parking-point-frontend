import { useState } from "react";
import "./AdminLogin.css";
import { showAlert, startLoading, stopLoading } from "../../actions/index";
import { connect } from "react-redux";
import axios from "axios";
import Input from "../smallerComponents/Input";
import Button from "../smallerComponents/Button";

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
    props.showAlert();
    axios.post(`${process.env.REACT_APP_API_URL}/admins/signin`, signinData).then(
      (response) => {
          console.log("pass", response.data);
          localStorage.setItem("token", response.data.token);
          window.location.reload(false);
          props.stopLoading();
      },
      (error) => {
        console.log("Error", error);
        if(error.response.message) {
          props.showAlert("Error occured! " + error.response.message);
        } else {
          props.showAlert("Unknown error occured!");
        }
        props.stopLoading();
      }
    );
  };

  return (
    <div className="AdminSignin main-container">
      <form onSubmit={handleSubmit}>
        <h1>ADMIN LOGIN</h1>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter email here"
          minLength="5"
          maxLength="30"
          required
          value={signinData.email}
          handleInputChange={handleInputChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter password here"
          minLength="6"
          maxLength="10"
          required
          value={signinData.password}
          handleInputChange={handleInputChange}
        />
        <Button buttonType="pri-btn">Login As Admin</Button>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
