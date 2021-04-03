import "./UserProfile.css";
import AppNavbar from "../AppNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import Button from "../smallerComponents/Button";
import Input from "../smallerComponents/Input";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/users/user/${
          jwtDecode(localStorage.getItem("token")).id
        }`
      )
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setUserDetails(res.data.data);
        } else {
          alert("Failed to load data!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to load data!");
      });
  }, []);

  return (
    <div className="UserProfile">
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

export default UserProfile;
