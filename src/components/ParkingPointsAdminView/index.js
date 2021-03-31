import "./ParkingPointsAdminView.css";
import AdminNavbar from "../AdminNavbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const ParkingPointsAdminView = () => {
  const [parkingPoints, setParkingPoints] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/parkingpoints/${
          jwtDecode(localStorage.getItem("token")).id
        }`
      )
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setParkingPoints(response.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/parkingpoints/parkingpoint/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  console.log("State: ", parkingPoints);

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

export default ParkingPointsAdminView;
