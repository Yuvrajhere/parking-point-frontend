import "./UserProfile.css";
import AppNavbar from "../AppNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Button from "../smallerComponents/Button";
import Input from "../smallerComponents/Input";
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

const UserProfile = (props) => {
  const [userDetails, setUserDetails] = useState({});

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

  return (
    <div className="UserProfile main-container">
      <AppNavbar />
      <main>
        <div className="details-div">
          <h1>Your details</h1>
          <div className="details">
            <Input label="First Name" value={userDetails.firstName} readOnly />
            <Input label="Last Name" value={userDetails.lastName} readOnly />
            <Input label="Email" value={userDetails.email} readOnly />
            <Input label="Phone Number" value={userDetails.phone} readOnly />
            <Input label="Balance" value={userDetails.balance} readOnly />
            <Link to="/profile/edit">
              <Button buttonType="pri-btn">Edit</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
