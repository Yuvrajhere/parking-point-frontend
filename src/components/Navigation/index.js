import "./Navigation.css";
import AppNavbar from "../AppNavbar";
import ReactMapGL, { GeolocateControl } from "react-map-gl";
import { useState } from "react";

const geolocateControlStyle = {
  right: 10,
  top: 10,
};

const Navigation = () => {
  const [viewport, setViewport] = useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14,
  });

  return (
    <div className="Navigation main-container">
      <AppNavbar />
      <main>
        <ReactMapGL
          {...viewport}
          width="100vw"
          height="100vh"
          onViewportChange={setViewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
          <GeolocateControl
            style={geolocateControlStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            auto
          />
        </ReactMapGL>
      </main>
    </div>
  );
};

export default Navigation;
