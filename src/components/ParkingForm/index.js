import "./ParkingForm.css";
import { useState, useEffect } from "react";
import AdminNavbar from "../AdminNavbar";
import { Link, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

const ParkingForm = () => {
  const [parkingFormDetails, setParkingFormDetails] = useState({
    name: "",
    maxCapacity: "",
    height: "",
    length: "",
    width: "",
    price: "",
    parkingPoint: "",
    createdBy: jwtDecode(localStorage.getItem("token")).id,
  });

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

  const { parkingId } = useParams();

  useEffect(() => {
    if (parkingId) {
      axios
        .get(`http://localhost:5000/api/parkings/parking/${parkingId}`)
        .then((response) => {
          console.log(response.data.data);
          if (response.data.success) {
            setParkingFormDetails({
              ...response.data.data,
              parkingPoint: response.data.data.parkingPoint._id,
            });
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const handleInputChange = (e) => {
    setParkingFormDetails({
      ...parkingFormDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(parkingFormDetails);
    axios
      .post("http://localhost:5000/api/parkings/", parkingFormDetails)
      .then((response) => {
        console.log(response);
        setParkingFormDetails({
          name: "",
          maxCapacity: "",
          height: "",
          length: "",
          width: "",
          price: "",
          parkingPointId: "",
          createdBy: jwtDecode(localStorage.getItem("token")).id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(parkingFormDetails);
    axios
      .put("http://localhost:5000/api/parkings/", parkingFormDetails)
      .then((response) => {
        console.log(response);
        setParkingFormDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("Parking Points state: ", parkingPoints);

  return (
    <div className="ParkingForm">
      <AdminNavbar />
      <main>
        <form onSubmit={parkingId ? handleUpdate : handleSubmit}>
          <h2>Create Parking</h2>
          <div className="form-fields">
            <div className="form-child">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name here"
                minLength="1"
                maxLength="30"
                required
                name="name"
                value={parkingFormDetails.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-child">
              <label htmlFor="maxCapacity">Max Capacity</label>
              <input
                type="number"
                id="maxCapacity"
                placeholder="Enter Max Capacity here"
                min="5"
                max="50"
                required
                name="maxCapacity"
                value={parkingFormDetails.maxCapacity}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-child">
              <label htmlFor="height">Height</label>
              <input
                type="number"
                id="height"
                step="any"
                placeholder="Enter Height here"
                min="1"
                max="20"
                required
                name="height"
                value={parkingFormDetails.height}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-child">
              <label htmlFor="length">Length</label>
              <input
                type="number"
                id="length"
                step="any"
                placeholder="Enter Length here"
                minLength="3"
                maxLength="50"
                required
                name="length"
                value={parkingFormDetails.length}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-child">
              <label htmlFor="width">Width</label>
              <input
                type="number"
                id="width"
                step="any"
                placeholder="Enter Width here"
                minLength="1"
                maxLength="20"
                required
                name="width"
                value={parkingFormDetails.width}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-child">
              <label htmlFor="price">Price / hour</label>
              <input
                type="number"
                id="price"
                placeholder="Enter Price here"
                min="5"
                max="5000"
                required
                name="price"
                value={parkingFormDetails.price}
                onChange={handleInputChange}
              />
            </div>
            {parkingPoints && (
              <div className="form-child">
                <label htmlFor="parkingPoint">Parking Point</label>
                <select
                  name="parkingPoint"
                  id="parkingPoint"
                  value={parkingFormDetails.parkingPoint}
                  required
                  onChange={handleInputChange}
                >
                  <option value="">select</option>
                  {parkingPoints.map((parkingPoint) => {
                    return (
                      <option
                        key={`${parkingPoint._id}`}
                        value={parkingPoint._id}
                      >
                        {`${parkingPoint._id} - ${parkingPoint.name}`}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
          <div className="btns">
            <button className="submit-btn">
              {parkingId ? "Update" : "Submit"}
            </button>
            {parkingId && (
              <Link to="/admin/parkings">
                <button className="sec-btn">Back</button>
              </Link>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default ParkingForm;
