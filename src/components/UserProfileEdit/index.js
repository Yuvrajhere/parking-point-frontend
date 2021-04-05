import { useState, useEffect } from "react";
import "./UserProfileEdit.css";
import AppNavbar from "../AppNavbar";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Input from "../smallerComponents/Input";
import Button from "../smallerComponents/Button";
import { startLoading, stopLoading, showAlert } from "../../actions/index";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  startLoading: startLoading,
  stopLoading: stopLoading,
  showAlert: showAlert,
};
const UserProfileEdit = (props) => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const history = useHistory();

  useEffect(() => {
    props.startLoading();
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/user/`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserDetails(res.data.data);
        props.stopLoading();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        if (err.response.status == 401) {
          if (err.response.data.isTokenExpired == true) {
            localStorage.removeItem("token");
          }
          history.push("/login");
          props.showAlert(err.response.data.message);
          props.stopLoading();
        } else {
          props.stopLoading();
          props.showAlert("Failed to load data!");
        }
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.startLoading();
    axios
      .put(`${process.env.REACT_APP_API_URL}/users/user`, userDetails, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        history.push("/profile");
        props.showAlert(res.data.message);
        props.stopLoading();
      })
      .catch((error) => {
        if (error.response.status == 401) {
          if (error.response.data.isTokenExpired == true) {
            localStorage.removeItem("token");
          }
          history.push("/login");
          props.showAlert(error.response.data.message);
        } if(error.response.status == 409) {
          console.log(error.response);
          props.showAlert(
            error.response.data.message
          );
        } else {
          props.showAlert(
            error.message + ", Please try again after some time!"
          );
        }
        props.stopLoading();
      });
  };

  return (
    <div className="UserProfileEdit main-container">
      <AppNavbar />
      <main>
        <div className="details-div">
          <h1>Your details</h1>
          <form onSubmit={handleSubmit}>
            <div className="details">
              <Input
                type="text"
                name="firstName"
                label="First Name"
                placeholder="Enter first name here"
                minLength="1"
                maxLength="12"
                required
                value={userDetails.firstName}
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
                value={userDetails.lastName}
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
                value={userDetails.phone}
                handleInputChange={handleInputChange}
                autoComplete="off"
              />

              <Button buttonType="pri-btn">Update</Button>
              <Link to="/profile/">
                <Button buttonType="sec-btn">Cancel</Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileEdit);
