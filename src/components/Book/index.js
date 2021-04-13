import "./Book.css";
import axios from "axios";
import { startLoading, stopLoading, showAlert } from "../../actions/index";
import { connect } from "react-redux";
import Input from "../smallerComponents/Input";
import Button from "../smallerComponents/Button";
import { Link, useHistory, useParams } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import { useState, useEffect } from "react";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  startLoading: startLoading,
  stopLoading: stopLoading,
  showAlert: showAlert,
};

const Book = (props) => {
  const history = useHistory();

  const { parkingId } = useParams();

  const [parkingDetails, setParkingDetails] = useState({});

  const [bookingDetails, setBookingDetails] = useState({
    arrivalDate: "",
    arrivalTime: "",
    hours: 0,
    totalPrice: 0,
    price: 0,
    parking: parkingId,
  });

  const handleInputChange = (e) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    props.startLoading();
    axios
      .get(`${process.env.REACT_APP_API_URL}/parkings/parking/${parkingId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setParkingDetails(response.data.data);
        setBookingDetails({
          ...bookingDetails,
          price: response.data.data.price,
        });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    props.startLoading();
    console.log("Going to send this ", bookingDetails);
    axios
      .post(`${process.env.REACT_APP_API_URL}/bookings`, bookingDetails, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        history.push("/home");
        props.showAlert("Parking Booked Successfully!");
        props.stopLoading();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 403) {
          props.showAlert(error.response.data.message);
        } else if (error.response.status == 401) {
          if (error.response.data.isTokenExpired == true) {
            localStorage.removeItem("token");
          }
          history.push("/login");
          props.showAlert(error.response.data.message);
        } else {
          props.showAlert("Failed to book parking!, Try again later.");
        }
        props.stopLoading();
      });
  };

  console.log(bookingDetails);

  return (
    <div className="Book main-container">
      <AppNavbar />
      <main>
        <h2>Book Parking</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Name" value={parkingDetails.name} readOnly />
          <Input
            type="date"
            label="Arrival Date"
            name="arrivalDate"
            min={new Date().toISOString().substr(0, 10)}
            value={bookingDetails.arrivalDate}
            handleInputChange={handleInputChange}
          />
          <Input
            type="time"
            label="Arrival Time"
            name="arrivalTime"
            value={bookingDetails.arrivalTime}
            handleInputChange={handleInputChange}
          />
          <Input
            type="number"
            label="No. of Hours"
            name="hours"
            value={bookingDetails.hours}
            handleInputChange={handleInputChange}
            min="0"
            max="24"
          />
          <Input
            label="Price (in rupees)"
            name="price"
            value={bookingDetails.hours * parkingDetails.price}
            readOnly
          />

          {/* parkingDetails.price * bookingDetails.hours */}
          <div className="book-btns">
            <Button buttonType="pri-btn">Book</Button>
            <Link to="/search">
              <Button buttonType="sec-btn">Cancel</Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
