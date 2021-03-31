import "./ParkingPointDetailsAdminView.css";
import AdminNavbar from "../AdminNavbar";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import { useState, useEffect } from "react";
import MarkerPNG from "../../assets/marker-for-new-parking-points.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import iconLocationPinYellow from "../../assets/images/icon-location-pin-yellow.png";

const ParkingPointDetailsAdminView = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    zoom: 7,
    latitude: 20.5937,
    longitude: 78.9629,
    bearing: 0,
    pitch: 0,
  });

  const [parkingPointDetails, setParkingPointDetails] = useState({
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

  const { parkingPointId } = useParams();

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/parkingpoints/parkingpoint/${parkingPointId}`
      )
      .then((response) => {
        console.log(response.data.data);
        if (response.data.success) {
          setParkingPointDetails(response.data.data);
          setViewport((prevViewport) => ({
            ...prevViewport,
            latitude: response.data.data.latitude,
            longitude: response.data.data.longitude,
          }));
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleViewPortChange = (newViewport) => {
    setViewport(newViewport);
  };

  console.log("State: ", parkingPointDetails);

  return (
    <div className="ParkingPointDetailsAdminView">
      <AdminNavbar />
      <main>
        <div className="main-a">
          <div className="map">
            <ReactMapGL
              {...viewport}
              mapStyle={"mapbox://styles/mapbox/dark-v10"}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              onViewportChange={handleViewPortChange}
            >
              <Marker
                latitude={parkingPointDetails.latitude}
                longitude={parkingPointDetails.longitude}
                offsetLeft={-20}
                offsetTop={-40}
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
        <div className="main-b">
          <h2>Parking Point Details</h2>
          <div className="fields">
            <div className="form-child">
              <label htmlFor="name">Name</label>
              <input type="text" value={parkingPointDetails.name} readOnly />
            </div>
            <div className="form-child">
              <label htmlFor="addressLine1">address Line 1</label>
              <input
                type="text"
                value={parkingPointDetails.addressLine1}
                readOnly
              />
            </div>
            <div className="form-child">
              <label htmlFor="addressLine2">Address Line 2</label>
              <input
                type="text"
                value={parkingPointDetails.addressLine2}
                readOnly
              />
            </div>
            <div className="form-child">
              <label htmlFor="city">City</label>
              <input type="text" value={parkingPointDetails.city} readOnly />
            </div>
            <div className="form-child">
              <label htmlFor="state">State</label>
              <input type="text" value={parkingPointDetails.state} readOnly />
            </div>
            <div className="form-child">
              <label htmlFor="pincode">Pincode</label>
              <input type="text" value={parkingPointDetails.pincode} readOnly />
            </div>
            <div className="form-child">
              <label htmlFor="email">Email</label>
              <input type="email" value={parkingPointDetails.email} readOnly />
            </div>
            <div className="form-child">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" value={parkingPointDetails.phone} readOnly />
            </div>
            <div className="form-child">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                value={parkingPointDetails.latitude}
                readOnly
              />
            </div>
            <div className="form-child">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                value={parkingPointDetails.longitude}
                readOnly
              />
            </div>
          </div>
          <Link to="/admin/parkingpoints">
            <button className="submit-btn">Back</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ParkingPointDetailsAdminView;
