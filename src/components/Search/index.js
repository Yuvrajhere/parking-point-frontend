import "./Search.css";
import AppNavbar from "../AppNavbar";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, NavigationControl, Popup } from "react-map-gl";
import iconLocationPinWhite from "../../assets/images/icon-location-pin-white.png";
import iconLocationPinYellow from "../../assets/images/icon-location-pin-yellow.png";
import { connect } from "react-redux";
import { showAlert, startLoading, stopLoading } from "../../actions/index";
import { Link } from "react-router-dom";
import axios from "axios";

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    searchText: state.searchText,
  };
};

const mapDispatchToProps = {
  showAlert: showAlert,
  startLoading: startLoading,
  stopLoading: stopLoading,
};

const Search = (props) => {

  const [parkings, setParkings] = useState([]);

  const [hoveredMarker, setHoveredMarker] = useState("");

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    zoom: 3.5,
    latitude: 20.5937,
    longitude: 78.9629,
    bearing: 0,
    pitch: 0,
  });

  const handleViewPortChange = (viewport) => {
    setViewport(viewport);
  };

  const fetchParkings = () => {
    props.startLoading();
    axios
      .get(`${process.env.API_URL}/parkingpoints/city/${props.searchText}`)
      .then(
        (response) => {
          if (response.data.success) {
            console.log("pass", response.data);
            setParkings(response.data.data);
            setViewport((prevViewport) => ({
              ...prevViewport,
              latitude: response.data.data[0].latitude,
              longitude: response.data.data[0].longitude,
              zoom: 10,
            }));
            props.stopLoading();
          } else {
            console.log("failed", response.data.message);
            props.stopLoading();
            alert("Failed to signin.");
          }
        },
        (error) => {
          console.log("Error", error);
          if (error.response.status === 400) {
            alert("No parking found in this city!");
          } else {
            alert("Error occured!");
          }
          props.stopLoading();
        }
      );
  };
  
  useEffect(() => {
    props.searchText && fetchParkings();
  }, [props.searchText]);

  return (
    <div className="Search">
      <AppNavbar/>
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
              {parkings.map((parking) => {
                return (
                  <Link to={`/parkingpoint/${parking._id}`}>
                    <div
                      className="marker"
                      key={parking._id}
                      onMouseEnter={(e) => {
                        setHoveredMarker(parking._id);
                      }}
                      onMouseLeave={(e) => {
                        setHoveredMarker("");
                      }}
                    >
                      <Marker
                        latitude={parking.latitude}
                        longitude={parking.longitude}
                        offsetLeft={-20}
                        offsetTop={-40}
                      >
                        {hoveredMarker == parking._id ? (
                          <img
                            width="40px"
                            height="40px"
                            src={iconLocationPinYellow}
                            alt="marker"
                          />
                        ) : (
                          <img
                            width="40px"
                            height="40px"
                            src={iconLocationPinWhite}
                            alt="marker"
                          />
                        )}
                      </Marker>
                    </div>
                  </Link>
                );
              })}
              <NavigationControl style={{ right: 10, top: 10 }} />
            </ReactMapGL>
          </div>
        </div>
        <div className="main-b">
          <h2>Parking Point List</h2>
          <div>
            {parkings.length > 0 ? (
              <div className="parking-list">
                {parkings.map((parking) => {
                  return (
                    <Link to={`/parkingpoint/${parking._id}`}><div
                    key={parking._id}
                    className={
                      hoveredMarker == parking._id
                        ? "parking-card hovered"
                        : "parking-card"
                    }
                    onMouseEnter={(e) => {
                      setHoveredMarker(parking._id);
                    }}
                    onMouseLeave={(e) => {
                      setHoveredMarker("");
                    }}
                  >
                    <p>{parking.name}</p>
                    <p>{parking.addressLine1}</p>
                    <p>{parking.addressLine2}</p>
                  </div></Link>
                  );
                })}
              </div>
            ) : (
              <p>No Parkings available with this city name!</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
