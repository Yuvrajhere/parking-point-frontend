import "./UserProfile.css";
import AppNavbar from "../AppNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {Link} from "react-router-dom";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/users/user/${
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
            <div className="form-child">
              <label>First Name</label>
              <input value={userDetails.firstName} readOnly/>
            </div>
            <div className="form-child">
              <label>Last Name</label>
              <input value={userDetails.lastName} readOnly/>
            </div>
            <div className="form-child">
              <label>Email</label>
              <input value={userDetails.email} readOnly/>
            </div>
            <div className="form-child">
              <label>Phone</label>
              <input value={userDetails.phone} readOnly/>
            </div>
            <div className="form-child">
              <label>Balance</label>
              <input value={userDetails.balance} readOnly/>
            </div>
          <Link to="/profile/edit"><button className="submit-btn">Edit</button></Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
