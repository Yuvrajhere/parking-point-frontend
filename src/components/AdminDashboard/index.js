import "./AdminDashboard.css";
import AdminNavbar from "../AdminNavbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AdminDashboard = () => {
  const [adminDetails, setAdminDetails] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/admins/admin/${
          jwtDecode(localStorage.getItem("token")).id
        }`
      )
      .then((res) => {
        if (res.data.success) {
          setAdminDetails(res.data.data);
        } else {
          alert("Failed to load data!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to load data!");
      });
  }, []);

  console.log(adminDetails);

  //   -	First name - String
  // -	Last name – String
  // -	Email - String
  // -	Phone - String
  // -	Password - String
  // -	Parking points – array of Object (Parking Point ) [ HOLD ]
  // -	Timestamps ON

  return (
    <div className="AdminDashboard">
      <AdminNavbar />
      <main>
        <div className="main-a">
          <h2>Admin Details</h2>
          <div className="details">
            <div className="form-child">
              <label>First Name</label>
              <input type="text" value={"Yuvraj Singh"} readOnly />
            </div>
            <div className="form-child">
              <label>Last Name</label>
              <input type="text" value={"Chouhan"} readOnly />
            </div>
            <div className="form-child">
              <label>Email</label>
              <input type="text" value={"yuvrajisbest13@gmail.com"} readOnly />
            </div>
            <div className="form-child">
              <label>Phone</label>
              <input type="text" value={"7204631052"} readOnly />
            </div>
          </div>
        </div>
        <div className="main-b">
          <div>
            <div>
              <h2>Register Parking Point</h2>
              <p>Create a new Parking Point!</p>
            </div>
            <Link to="/admin/parkingpoints/new">
              <button className="submit-btn">Create Parking Point</button>
            </Link>
          </div>
          <div>
            <div>
              <h2>Parking Points List</h2>
              <p>View list of all Parking Points created by you!</p>
            </div>
            <Link to="/admin/parkingpoints">
              <button className="submit-btn">View Parking Points</button>
            </Link>
          </div>
          <div>
            <div>
              <h2>Register Parking</h2>
              <p>Add Parking Type to a Parking Point!</p>
            </div>
            <Link to="/admin/parkings/new">
              <button className="submit-btn">Create Parking</button>
            </Link>
          </div>
          <div>
            <div>
              <h2>Parkings List</h2>
              <p>View list of all Parkings created by you!</p>
            </div>
            <Link to="/admin/parkings">
              <button className="submit-btn">View Parkings</button>
            </Link>
          </div>
        </div>

        {/* <Link to="/admin/parkingpoints/new"></Link>
        <Link to="/admin/parkingpoints">
          <h2>View Parking Points</h2>
        </Link>
        <Link to="/admin/parkings/new">
          <h2>Create Parking</h2>
        </Link>
        <Link to="/admin/parkings">
          <h2>View Parkings</h2>
        </Link> */}
      </main>
    </div>
  );
};

export default AdminDashboard;
