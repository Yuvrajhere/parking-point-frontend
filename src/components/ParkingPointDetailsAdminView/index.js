import "./ParkingPointDetailsAdminView.css";
import AdminNavbar from "../AdminNavbar";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import iconLocationPinYellow from "../../assets/images/icon-location-pin-yellow.png";
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

const ParkingPointDetailsAdminView = (props) => {

  const history = useHistory();

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
        `${process.env.REACT_APP_API_URL}/parkingpoints/parkingpoint/${parkingPointId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setParkingPointDetails(response.data.data);
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude: response.data.data.latitude,
          longitude: response.data.data.longitude,
        }));
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

  const handleViewPortChange = (newViewport) => {
    setViewport(newViewport);
  };

  return (
    <div className="ParkingPointDetailsAdminView main-container">
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
            {/* <div className="form-child">
              <label htmlFor="name">Name</label>
              <input type="text" value={parkingPointDetails.name} readOnly />
            </div> */}
            <Input
              label="Name"
              name="name"
              value={parkingPointDetails.name}
              readOnly
            />
            {/* <div className="form-child">
              <label htmlFor="addressLine1">address Line 1</label>
              <input
                type="text"
                value={parkingPointDetails.addressLine1}
                readOnly
              />
            </div> */}
            <Input
              label="Address Line 1"
              name="addressLine1"
              value={parkingPointDetails.addressLine1}
              readOnly
            />
            {/* <div className="form-child">
              <label htmlFor="addressLine2">Address Line 2</label>
              <input
                type="text"
                value={parkingPointDetails.addressLine2}
                readOnly
              />
            </div> */}
            <Input
              label="Address Line 3"
              name="addressLine2"
              value={parkingPointDetails.addressLine2}
              readOnly
            />
            {/* <div className="form-child">
              <label htmlFor="city">City</label>
              <input type="text" value={parkingPointDetails.city} readOnly />
            </div> */}
            <Input
              label="City"
              name="city"
              value={parkingPointDetails.city}
              readOnly
            />
            {/* <div className="form-child">
              <label htmlFor="state">State</label>
              <input type="text" value={parkingPointDetails.state} readOnly />
            </div> */}
            <Input
              label="State"
              name="state"
              value={parkingPointDetails.state}
              readOnly
            />
            {/* <div className="form-child">
              <label htmlFor="pincode">Pincode</label>
              <input type="text" value={parkingPointDetails.pincode} readOnly />
            </div> */}
            <Input
              label="Pincode"
              name="pincode"
              value={parkingPointDetails.pincode}
              readOnly
            />
            {/* <div className="form-child">
              <label htmlFor="email">Email</label>
              <input type="email" value={parkingPointDetails.email} readOnly />
            </div> */}
            <Input
              label="Email"
              type="email"
              name="email"
              value={parkingPointDetails.email}
              readOnly
            />
            {/* <div className="form-child">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" value={parkingPointDetails.phone} readOnly />
            </div> */}
            <Input
              label="Phone Number"
              name="phone"
              value={parkingPointDetails.phone}
              readOnly
            />
            {/* <div className="form-child">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                value={parkingPointDetails.latitude}
                readOnly
              />
            </div> */}
            <Input
              label="Latitude"
              type="number"
              name="latitude"
              value={parkingPointDetails.latitude}
              readOnly
            />
            {/* <div className="form-child">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                value={parkingPointDetails.longitude}
                readOnly
              />
            </div> */}
            <Input
              label="Longitude"
              type="number"
              name="longitude"
              value={parkingPointDetails.longitude}
              readOnly
            />
          </div>
          <Link to="/admin/parkingpoints">
            <Button buttonType="pri-btn">Back</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParkingPointDetailsAdminView);
