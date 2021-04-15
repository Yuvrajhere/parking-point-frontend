import "./ParkingPoint.css";
import { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import iconLocationPinYellow from "../../assets/images/icon-location-pin-yellow.png";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import axios from "axios";
import { startLoading, stopLoading, showAlert } from "../../actions/index";
import { connect } from "react-redux";
import Button from "../smallerComponents/Button";
import { Link, useHistory, useParams } from "react-router-dom";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  startLoading: startLoading,
  stopLoading: stopLoading,
  showAlert: showAlert,
};

const ParkingPoint = (props) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    zoom: 10,
    latitude: 20.5937,
    longitude: 78.9629,
    bearing: 0,
    pitch: 0,
  });

  const [parkingPointDetails, setParkingPointDetails] = useState({});

  const [parkings, setParkings] = useState([]);

  const handleViewPortChange = (viewport) => {
    setViewport(viewport);
  };

  const { parkingPointId } = useParams();

  const history = useHistory();

  useEffect(() => {
    props.startLoading();
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/parkings/parkingpoint/${parkingPointId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
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
          props.showAlert("Failed to load data!, Try again later.");
        }
        props.stopLoading();
      });
  }, []);

  useEffect(() => {
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
        setParkingPointDetails(response.data.data);
        setViewport((prevVieport) => ({
          ...prevVieport,
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

  const saveParkingPoint = () => {
    props.startLoading();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/parkingpoints/parkingpoint/${parkingPointId}`,
        {parkingPointId},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setParkingPointDetails(response.data.data);
        setViewport((prevVieport) => ({
          ...prevVieport,
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
  };

  // /parkingpoint/:parkingPointId

  return (
    <div className="ParkingPoint main-container">
      <AppNavbar />
      <main>
        <div className="main-a">
          <div>
            <ReactMapGL
              id="map"
              {...viewport}
              mapStyle={"mapbox://styles/mapbox/dark-v10"}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              onViewportChange={handleViewPortChange}
            >
              <div className="marker">
                <Marker
                  latitude={parkingPointDetails.latitude || 20.5937}
                  longitude={parkingPointDetails.longitude || 78.9629}
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
              </div>
              <NavigationControl style={{ right: 10, top: 10 }} />
            </ReactMapGL>
          </div>
        </div>
        <div className="main-b">
          <h2>Parking Point Details</h2>
          <div className="details-div">
            <div className="details">
              <h3>{parkingPointDetails.name}</h3>
              <p>{parkingPointDetails.addressLine1}</p>
              <p>{parkingPointDetails.addressLine2}</p>
              <div>
                <p>{parkingPointDetails.city}</p>
                <p>{parkingPointDetails.pincode}</p>
                <p>{parkingPointDetails.state}</p>
              </div>
              <div>
                <p>{parkingPointDetails.phone}</p>
                <p>{parkingPointDetails.email}</p>
              </div>
              <Button onClick={saveParkingPoint}></Button>
            </div>
            <div className="parkings-div">
              <h2>Parkings</h2>
              <div className="parkings">
                {parkings.map((parking) => {
                  return (
                    <div key={parking._id}>
                      <p>{parking.name}</p>
                      <p>{"Length : " + parking.length + "m"}</p>
                      <p>{"Width : " + parking.width + "m"} </p>
                      <p>{"Height : " + parking.height + "m"}</p>
                      <p>{"Price / Hour : ₹" + parking.price}</p>
                      <Link to={`/book/${parking._id}`}>
                        <Button buttonType="pri-btn">Book</Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// -	_id – Number
// -	Name – String
// -	Address Line 1 – String
// -	Address Line 2 – String
// -	City – array of String
// -	State – String
// -	Pin code – String
// -	Parkings – array of Object (Parking) [ HOLD ]
// -	Latitude – Number
// -	Longitude – Number
// -	Email – String
// -	Phone – String

export default connect(mapStateToProps, mapDispatchToProps)(ParkingPoint);
