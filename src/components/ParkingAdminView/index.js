import "./ParkingAdminView.css";
import AdminNavbar from "../AdminNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ParkingAdminView = () => {
  const [parkings, setParkings] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/parkings/${
          jwtDecode(localStorage.getItem("token")).id
        }`
      )
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setParkings(response.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (parkingId) => {
    axios
      .delete(`http://localhost:5000/api/parkings/parking/${parkingId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    /*<div className="ParkingPointsAdminView">
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
    </div> */
    <div className="ParkingAdminView">
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
              {parkings.map((parking) => {
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

export default ParkingAdminView;
