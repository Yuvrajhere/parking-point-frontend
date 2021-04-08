import "./ParkingAdminView.css";
import AdminNavbar from "../AdminNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
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

const ParkingAdminView = (props) => {
  const [parkings, setParkings] = useState([]);

  const history = useHistory();

  useEffect(() => {
    props.startLoading();
    axios
      .get(`${process.env.REACT_APP_API_URL}/parkings/admin`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setParkings(response.data.data);
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
          props.showAlert("Failed to create Parking Point!");
        }
        props.stopLoading();
      });
  }, []);

  const handleDelete = (parkingId) => {
    props.startLoading();
    axios
      .delete(`${process.env.REACT_APP_API_URL}/parkings/parking/${parkingId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        props.stopLoading();
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
          props.showAlert("Failed to delete Parking Point!");
        }
        props.stopLoading();
      });
  };

  return (
    <div className="ParkingAdminView main-container">
      <AdminNavbar />
      <main>
        <div className="main-a">
          <h1>Parkings</h1>
          <p>Count - {parkings.length}</p>
        </div>
        <div className="main-b">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Max Capacity</th>
                <th>Height (metre)</th>
                <th>Length (metre)</th>
                <th>Width (metre)</th>
                <th>Price / hour</th>
                <th>Parking Point Name</th>
                <th>City</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {parkings &&
                parkings.map((parking) => {
                  return (
                    <tr key={parking._id}>
                      <td>{parking._id}</td>
                      <td>{parking.name}</td>
                      <td>{parking.maxCapacity}</td>
                      <td>{parking.height}</td>
                      <td>{parking.length}</td>
                      <td>{parking.width}</td>
                      <td>₹{parking.price}</td>
                      <td>{parking.parkingPoint.name}</td>
                      <td>{parking.parkingPoint.city}</td>
                      <td>
                        <Link to={`/admin/parking/edit/${parking._id}`}>
                          Edit
                        </Link>
                      </td>
                      <td>
                        <p
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(parking._id);
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

export default connect(mapStateToProps, mapDispatchToProps)(ParkingAdminView);
