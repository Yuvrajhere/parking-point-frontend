import { useState, useEffect } from "react";
import "./UserProfileEdit.css";
import AppNavbar from "../AppNavbar";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

const UserProfileEdit = () => {
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
    <div className="UserProfileEdit">
      <AppNavbar />
      <main>
        <div className="details-div">
          <h1>Your details</h1>
          <div className="details">
            <div className="form-child">
              <label>First Name</label>
              <input value={userDetails.firstName} readOnly />
            </div>
            <div className="form-child">
              <label>Last Name</label>
              <input value={userDetails.lastName} readOnly />
            </div>
            <div className="form-child">
              <label>Phone</label>
              <input value={userDetails.phone} readOnly />
            </div>
            <div>
              <Link to="/profile/edit">
                <button className="submit-btn">Update</button>
              </Link>
              <Link to="/profile/">
                <button className="sec-btn">Cancel</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfileEdit;
