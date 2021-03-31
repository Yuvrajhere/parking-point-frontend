import "./ParkingPointForm.css";
import AdminNavbar from "../AdminNavbar";
import { useEffect, useState } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import MarkerPNG from "../../assets/marker-for-new-parking-points.png";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import iconLocationPinYellow from "../../assets/images/icon-location-pin-yellow.png";

const ParkingPointForm = () => {
  const [parkingPointFormDetails, setParkingPointFormDetails] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
    email: "",
    phone: "",
    state: "",
    createdBy: jwtDecode(localStorage.getItem("token")).id,
    latitude: 20.5937,
    longitude: 78.9629,
  });

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    zoom: 3.5,
    latitude: 20.5937,
    longitude: 78.9629,
    bearing: 0,
    pitch: 0,
  });

  const { parkingPointId } = useParams();

  useEffect(() => {
    if (parkingPointId) {
      axios
        .get(
          `http://localhost:5000/api/parkingpoints/parkingpoint/${parkingPointId}`
        )
        .then((response) => {
          console.log(response.data.data);
          if (response.data.success) {
            setParkingPointFormDetails(response.data.data);
            setViewport((prevViewport) => ({
              ...prevViewport,
              latitude: response.data.data.latitude,
              longitude: response.data.data.longitude,
            }));
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const handleInputChange = (e) => {
    setParkingPointFormDetails({
      ...parkingPointFormDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(parkingPointFormDetails);
    axios
      .post("http://localhost:5000/api/parkingpoints/", parkingPointFormDetails)
      .then((response) => {
        console.log(response);
        setParkingPointFormDetails({
          name: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          pincode: "",
          email: "",
          phone: "",
          state: "",
          latitude: 20.5937,
          longitude: 78.9629,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(parkingPointFormDetails);
    axios
      .put("http://localhost:5000/api/parkingpoints/", parkingPointFormDetails)
      .then((response) => {
        console.log(response);
        setParkingPointFormDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleViewPortChange = (viewport) => {
    setViewport(viewport);
  };

  const handleMarkerDrag = (event) => {
    setParkingPointFormDetails({
      ...parkingPointFormDetails,
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
  };

  const handleMarkerDragEnd = (event) => {
    setParkingPointFormDetails({
      ...parkingPointFormDetails,
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
  };

  return (
    <div className="ParkingPointForm">
      <AdminNavbar />
      <main>
        <form onSubmit={parkingPointId ? handleUpdate : handleSubmit}>
          <div className="map-div">
            <div className="map">
              <ReactMapGL
                {...viewport}
                mapStyle={"mapbox://styles/mapbox/dark-v10"}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={handleViewPortChange}
              >
                <Marker
                  latitude={parkingPointFormDetails.latitude}
                  longitude={parkingPointFormDetails.longitude}
                  offsetLeft={-20}
                  offsetTop={-40}
                  draggable
                  onDrag={handleMarkerDrag}
                  onDragEnd={handleMarkerDragEnd}
                >
                  <img
                    width="40px"
                    height="40px"
                    src={iconLocationPinYellow}
                    alt="marker"
                  />
                </Marker>
                <NavigationControl style={{ right: 10, top: 10 }} />
              </ReactMapGL>
            </div>
          </div>
          <div className="form-fields-div">
            <h2>{(parkingPointId ? "Update" : "Create") + " Parking Point"}</h2>
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
                  value={parkingPointFormDetails.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-child">
                <label htmlFor="addressLine1">address Line 1</label>
                <input
                  type="text"
                  id="addressLine1"
                  placeholder="Enter Address Line 1 here"
                  minLength="3"
                  maxLength="30"
                  required
                  name="addressLine1"
                  value={parkingPointFormDetails.addressLine1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-child">
                <label htmlFor="addressLine2">Address Line 2</label>
                <input
                  type="text"
                  id="addressLine2"
                  placeholder="Enter Address Line 2 here"
                  minLength="3"
                  maxLength="30"
                  required
                  name="addressLine2"
                  value={parkingPointFormDetails.addressLine2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-child">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  placeholder="Enter city here"
                  minLength="1"
                  maxLength="20"
                  required
                  name="city"
                  value={parkingPointFormDetails.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-child">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  placeholder="Enter state here"
                  minLength="3"
                  maxLength="12"
                  required
                  name="state"
                  value={parkingPointFormDetails.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-child">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  placeholder="Enter pincode here"
                  minLength="6"
                  maxLength="6"
                  required
                  name="pincode"
                  value={parkingPointFormDetails.pincode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-child">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email here"
                  minLength="5"
                  maxLength="30"
                  required
                  name="email"
                  value={parkingPointFormDetails.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-child">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter phone number here"
                  minLength="12"
                  maxLength="12"
                  required
                  name="phone"
                  value={parkingPointFormDetails.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-child">
                <label htmlFor="latitude">Latitude</label>
                <input
                  type="number"
                  step="any"
                  id="latitude"
                  placeholder="Enter latitude here"
                  min="-90"
                  max="90"
                  required
                  name="latitude"
                  value={parkingPointFormDetails.latitude}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className="form-child">
                <label htmlFor="longitude">Longitude</label>
                <input
                  type="number"
                  step="any"
                  id="longitude"
                  placeholder="Enter longitude here"
                  min="-180"
                  max="180"
                  required
                  name="longitude"
                  value={parkingPointFormDetails.longitude}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            </div>
            <button className="submit-btn">
              {parkingPointId ? "Update" : "Submit"}
            </button>
            {parkingPointId && (
              <Link to="/admin/parkingpoints">
                <button  className="sec-btn">Back</button>
              </Link>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default ParkingPointForm;
