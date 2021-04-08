import "./AdminDashboard.css";
import AdminNavbar from "../AdminNavbar";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
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

const AdminDashboard = (props) => {
  const [adminDetails, setAdminDetails] = useState({});

  const history = useHistory();

  useEffect(() => {
    props.startLoading();
    axios
      .get(`${process.env.REACT_APP_API_URL}/admins/admin/`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setAdminDetails(res.data.data);
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
        } else {
          props.showAlert("Failed to load data!");
        }
        props.stopLoading();
      });
  }, []);

  return (
    <div className="AdminDashboard main-container">
      <AdminNavbar />
      <main>
        <div className="main-a">
          <h2>Admin Details</h2>
          <div className="details">
            <Input label="First Name" value={adminDetails.firstName} readOnly />
            <Input label="Last Name" value={adminDetails.lastName} readOnly />
            <Input label="Email" value={adminDetails.email} readOnly />
            <Input label="Phone Number" value={adminDetails.phone} readOnly />
          </div>
        </div>
        <div className="main-b">
          <div>
            <div>
              <h2>Register Parking Point</h2>
              <p>Create a new Parking Point!</p>
            </div>
            <Link to="/admin/parkingpoints/new">
              <Button buttonType="pri-btn">Create Parking Point</Button>
            </Link>
          </div>
          <div>
            <div>
              <h2>Parking Points List</h2>
              <p>View list of all Parking Points created by you!</p>
            </div>
            <Link to="/admin/parkingpoints">
              <Button buttonType="pri-btn">View Parking Points</Button>
            </Link>
          </div>
          <div>
            <div>
              <h2>Register Parking</h2>
              <p>Add Parking Type to a Parking Point!</p>
            </div>
            <Link to="/admin/parkings/new">
              <Button buttonType="pri-btn">Create Parking</Button>
            </Link>
          </div>
          <div>
            <div>
              <h2>Parkings List</h2>
              <p>View list of all Parkings created by you!</p>
            </div>
            <Link to="/admin/parkings">
              <Button buttonType="pri-btn">View Parkings</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
