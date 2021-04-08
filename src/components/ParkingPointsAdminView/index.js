import "./ParkingPointsAdminView.css";
import AdminNavbar from "../AdminNavbar";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
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

const ParkingPointsAdminView = (props) => {
  const [parkingPoints, setParkingPoints] = useState([]);

  const history = useHistory();

  useEffect(() => {
    props.startLoading();
    axios
      .get(`${process.env.REACT_APP_API_URL}/parkingpoints/admin`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setParkingPoints(response.data.data);
        props.stopLoading();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 401) {
          if (error.response.data.isTokenExpired == true) {
            localStorage.removeItem("token");
          }
          history.push("/login");
          props.showAlert(error.response.data.message);
        } else {
          props.showAlert("Failed to load data!, Try again later.");
        }
        props.stopLoading();
      });
  }, []);

  const handleDelete = (id) => {
    props.startLoading();
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/parkingpoints/parkingpoint/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 401) {
          if (error.response.data.isTokenExpired == true) {
            localStorage.removeItem("token");
          }
          history.push("/login");
          props.showAlert(error.response.data.message);
        } else {
          props.showAlert("Failed to delete Parking Point.");
        }
        props.stopLoading();
      });
  };

  return (
    <div className="ParkingPointsAdminView">
      <AdminNavbar />
      <main>
        <div className="main-a">
          <h1>Your Parking Points</h1>
          <p>Count - {parkingPoints.length}</p>
        </div>
        <div className="main-b">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>City</th>
                <th>State</th>
                <th>Pincode</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {parkingPoints.map((parkingPoint) => {
                return (
                  <tr key={parkingPoint._id}>
                    <td>{parkingPoint._id}</td>
                    <td>{parkingPoint.name}</td>
                    <td>{parkingPoint.city}</td>
                    <td>{parkingPoint.state}</td>
                    <td>{parkingPoint.pincode}</td>
                    <td>
                      <Link
                        to={`/admin/parkingpoint/details/${parkingPoint._id}`}
                      >
                        View
                      </Link>
                    </td>
                    <td>
                      <Link to={`/admin/parkingpoint/edit/${parkingPoint._id}`}>
                        Edit
                      </Link>
                    </td>
                    <td>
                      <p
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(parkingPoint._id);
                        }}
                      >
                        Delete
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParkingPointsAdminView);
