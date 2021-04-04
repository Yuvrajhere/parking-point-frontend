import "./Home.css";
import AppNavbar from "../AppNavbar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { startLoading, stopLoading, showAlert } from "../../actions/index";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import iconInfoFilled from "../../assets/images/icon-info-filled.svg";
import Button from "../smallerComponents/Button";

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
        `${process.env.REACT_APP_API_URL}/users/user/${
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
    <div className="Home main-container">
      <AppNavbar />
      <main>
        <div className="main-a">
          <div className="about">
            <h2>{(userDetails.firstName || "") + " " + (userDetails.lastName || "")}</h2>
            <div className="coins">
              <p className="coins-count">
                {(userDetails.balance) + " PP"}
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
            <div className="no-booked-parking">
              <h1>You dont have any booked parking right now!</h1>
              <p>Lets find a good parking for you!</p>
              <Link to="/search">
                <Button buttonType="pri-btn">Go to Search Page</Button>
              </Link>
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
