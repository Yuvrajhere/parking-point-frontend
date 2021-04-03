import { useState, useEffect } from "react";
import "./UserProfileEdit.css";
import AppNavbar from "../AppNavbar";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Input from "../smallerComponents/Input";
import Button from "../smallerComponents/Button";

const UserProfileEdit = () => {
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
    <div className="UserProfileEdit">
      <AppNavbar />
      <main>
        <div className="details-div">
          <h1>Your details</h1>
          <div className="details">
            <Input label="First Name" value={userDetails.firstName} readOnly />
            <Input label="Last Name" value={userDetails.lastName} readOnly />
            <Input label="Phone Number" value={userDetails.phone} readOnly />
            <div>
              <Link to="/profile/edit">
                <Button buttonType="pri-btn">Update</Button>
              </Link>
              <Link to="/profile/">
                <Button buttonType="sec-btn">Cancel</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfileEdit;
