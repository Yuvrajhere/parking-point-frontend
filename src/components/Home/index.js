import "./Home.css";
import AppNavbar from "../AppNavbar";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { startLoading, stopLoading, showAlert } from "../../actions/index";
import axios from "axios";
import { useEffect, useState } from "react";
import iconInfoFilled from "../../assets/images/icon-info-filled.svg";
import Button from "../smallerComponents/Button";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  startLoading: startLoading,
  stopLoading: stopLoading,
  showAlert: showAlert,
};

const Home = (props) => {
  const history = useHistory();

  const [userDetails, setUserDetails] = useState({
    booking: [],
    vehicles: [],
    savedParkingPoints: [],
  });

  useEffect(() => {
    props.startLoading();
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/user/`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("RES, ", res);
        setUserDetails(res.data.data);
        props.stopLoading();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        if (err.response.status == 401) {
          if (err.response.data.isTokenExpired == true) {
            localStorage.removeItem("token");
          }
          history.push("/login");
          props.showAlert(err.response.data.message);
        } else {
          props.showAlert("Failed to load data!");
        }
        props.stopLoading();
      });
  }, []);

  return (
    <div className="Home main-container">
      <AppNavbar />
      <main>
        <div className="main-a">
          <div className="about">
            <h2>
              {(userDetails.firstName || "") +
                " " +
                (userDetails.lastName || "")}
            </h2>
            <div className="coins">
              <p className="coins-count">
                {(userDetails.balance || "") + " PP"}
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
            {userDetails.booking.length > 0 ? (
              <div className="about-booked-parking">
                <h1>Your Parking is waiting for you!</h1>
                <div>
                  <p>{userDetails.booking[0].parking.name}</p>
                  <p>{userDetails.booking[0].parking.parkingPoint.name}</p>
                  <p>
                    {userDetails.booking[0].parking.parkingPoint.addressLine2}
                  </p>
                  <p>{userDetails.booking[0].parking.parkingPoint.city}</p>
                  <p>
                    {"From - " +
                      new Date(userDetails.booking[0].arrival).toLocaleString()}
                  </p>
                  <p>
                    {"Till - " +
                      new Date(
                        userDetails.booking[0].departure
                      ).toLocaleString()}
                  </p>
                </div>
                <Link
                  to={`/parkingpoint/${userDetails.booking[0].parking.parkingPoint._id}`}
                >
                  <Button buttonType="pri-btn">Navigate to Parking</Button>
                </Link>
              </div>
            ) : (
              <div className="no-booked-parking">
                <h1>You dont have any booked parking right now!</h1>
                <p>Lets find a good parking for you!</p>
                <Link to="/search">
                  <Button buttonType="pri-btn">Go to Search Page</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="main-b">
          <div className="history">
            <h2>History</h2>
            {userDetails.booking.length > 0 ? (
              <div className="history-list">
                {userDetails.booking.map((eachBooking) => {
                  return (
                    <Link key={eachBooking._id} to={`/parkingpoint/${eachBooking.parking.parkingPoint._id}`}>
                      <div  className="booking-card">
                        <p>
                          {eachBooking.parking.name +
                            " - ₹" +
                            eachBooking.parking.price}
                        </p>
                        <p>{eachBooking.parking.parkingPoint.name}</p>
                        <p>{eachBooking.parking.parkingPoint.city}</p>
                        <p>
                          {"Booking Date - " +
                            new Date(eachBooking.bookingDate).toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="no-history">
                <p>You dont have any Parking history!</p>
              </div>
            )}
          </div>
          <div className="saved-parkings">
            <h2>Saved Parking Points</h2>
            <div className="no-saved-parkings">
              <p>You dont have any Saved Parking Points!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
