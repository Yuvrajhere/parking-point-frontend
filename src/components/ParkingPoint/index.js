import "./ParkingPoint.css";
import { useState } from "react";
import AppNavbar from "../AppNavbar";
import iconLocationPinYellow from "../../assets/images/icon-location-pin-yellow.png";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";

const ParkingPoint = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    zoom: 10,
    latitude: 20.5937,
    longitude: 78.9629,
    bearing: 0,
    pitch: 0,
  });

  const handleViewPortChange = (viewport) => {
    setViewport(viewport);
  };

  return (
    <div className="ParkingPoint">
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
                  latitude={20.5937}
                  longitude={78.9629}
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
              <p>Name</p>
              <p>Address Line 1</p>
              <p>Address Line 2</p>
              <div>
                <p>City</p>
                <p>State</p>
              </div>
              <div>
                <p>Pin Code</p>
                <p>Phone</p>
              </div>
            </div>
            <div className="parkings-div">
              <h2>Parkings</h2>
              <div className="parkings">
                <div>
                  <p>Parking 1</p>
                  <p>length</p>
                  <p>width</p>
                  <p>Height</p>
                  <p>Price / Hour</p>
                  <button>Book</button>
                </div>
                <div>
                  <p>Parking 2</p>
                  <p>length</p>
                  <p>width</p>
                  <p>Height</p>
                  <p>Price / Hour</p>
                  <button>Book</button>
                </div>
                <div>
                  <p>Parking 3</p>
                  <p>length</p>
                  <p>width</p>
                  <p>Height</p>
                  <p>Price / Hour</p>
                  <button>Book</button>
                </div>
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

export default ParkingPoint;
