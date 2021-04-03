import "./Home.css";
import AppNavbar from "../AppNavbar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  startLoading,
  stopLoading,
  showAlert,
} from "../../actions/index";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import iconInfoFilled from "../../assets/images/icon-info-filled.svg";

const mapStateToProps = (state) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = {
  startLoading: startLoading,
  stopLoading: stopLoading,
  showAlert: showAlert,
};

const Home = (props) => {
  const [userDetails, setUserDetails] = useState({
    booking: [],
    vehicles: [],
    savedParkingPoints: [],
  });

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/users/user/${
          jwtDecode(localStorage.getItem("token")).id
        }`
      )
      .then((res) => {
        if (res.data.success) {
          setUserDetails(res.data.data);
        } else {
          alert("Failed to load data!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to load data!");
      });
  }, []);

  return (
    <div className="Home">
      <AppNavbar />
      <main>
        <div className="main-a">
          <div className="about">
            <h2>{userDetails.firstName + " " + userDetails.lastName}</h2>
            <div className="coins">
              <p className="coins-count">
                {(userDetails.coins || 150) + " PP"}
              </p>
              <img src={iconInfoFilled} />
              <p className="coin-info">
                Parking Points (PPs) are used for booking parkings and can be
                recharged at parking points.
              </p>
            </div>
          </div>
          <div className="booked-parking">
            <h2>Booked Parking</h2>
            <div>
              <h1>You dont have any booked parking right now!</h1>
              <p>Lets find a good parking for you!</p>
              <Link to="/search"><button className="submit-btn">Go to Search Page</button></Link>
            </div>
          </div>
        </div>
        <div className="main-b">
          <div className="history">
            <h2>History</h2>
            <div>
              <p>You dont have any Parking history!</p>
            </div>
          </div>
          <div className="saved-parkings">
            <h2>Saved Parking Points</h2>
            <div>
              <p>You dont have any Saved Parking Points!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
