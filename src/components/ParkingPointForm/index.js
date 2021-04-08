import "./ParkingPointForm.css";
import AdminNavbar from "../AdminNavbar";
import { useEffect, useState } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
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

const ParkingPointForm = (props) => {
  const history = useHistory();

  const [parkingPointFormDetails, setParkingPointFormDetails] = useState({
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
      props.startLoading();
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
          setParkingPointFormDetails(response.data.data);
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
    console.log("Yop");
    props.startLoading();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/parkingpoints/`,
        parkingPointFormDetails,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
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
        props.showAlert("Parking Point created Successfully!");
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
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    props.startLoading();
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/parkingpoints/`,
        parkingPointFormDetails,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
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
        props.showAlert("Parking Point updated Successfully!");
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
          props.showAlert("Failed to update Parking Point!");
        }
        props.stopLoading();
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
    <div className="ParkingPointForm main-container">
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
              <Input
                label="Name"
                name="name"
                placeholder="Enter name here"
                minLength="1"
                maxLength="30"
                required
                value={parkingPointFormDetails.name}
                handleInputChange={handleInputChange}
              />
              <Input
                label="Address Line 1"
                name="addressLine1"
                placeholder="Enter Address Line 1 here"
                minLength="3"
                maxLength="30"
                required
                value={parkingPointFormDetails.addressLine1}
                handleInputChange={handleInputChange}
              />
              <Input
                label="Address Line 2"
                name="addressLine2"
                placeholder="Enter Address Line 2 here"
                minLength="3"
                maxLength="30"
                required
                value={parkingPointFormDetails.addressLine2}
                handleInputChange={handleInputChange}
              />
              {/* maybe this should be select */}
              <Input
                label="City"
                name="city"
                placeholder="Enter city here"
                minLength="1"
                maxLength="20"
                required
                value={parkingPointFormDetails.city}
                handleInputChange={handleInputChange}
              />
              {/* maybe this should be select */}
              <Input
                label="State"
                name="state"
                placeholder="Enter state here"
                minLength="3"
                maxLength="12"
                required
                value={parkingPointFormDetails.state}
                handleInputChange={handleInputChange}
              />
              <Input
                label="Pincode"
                name="pincode"
                placeholder="Enter pincode here"
                minLength="6"
                maxLength="6"
                required
                value={parkingPointFormDetails.pincode}
                handleInputChange={handleInputChange}
              />
              <Input
                type="email"
                label="Email"
                name="email"
                placeholder="Enter email here"
                minLength="5"
                maxLength="30"
                required
                value={parkingPointFormDetails.email}
                handleInputChange={handleInputChange}
              />
              <Input
                label="Phone Number"
                name="phone"
                placeholder="Enter phone number here"
                minLength="10"
                maxLength="10"
                required
                value={parkingPointFormDetails.phone}
                handleInputChange={handleInputChange}
              />
              <Input
                type="number"
                label="Latitude"
                name="latitude"
                placeholder="Enter latitude here"
                min="-90"
                max="90"
                required
                value={parkingPointFormDetails.latitude}
                handleInputChange={handleInputChange}
                readOnly
              />
              <Input
                type="number"
                label="Longitude"
                name="longitude"
                placeholder="Enter longitude here"
                min="-180"
                max="180"
                required
                value={parkingPointFormDetails.longitude}
                handleInputChange={handleInputChange}
                readOnly
              />
            </div>
            <Button buttonType="pri-btn">
              {parkingPointId ? "Update" : "Submit"}
            </Button>
            {parkingPointId && (
              <Link to="/admin/parkingpoints">
                <Button buttonType="sec-btn">Back</Button>
              </Link>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ParkingPointForm);
