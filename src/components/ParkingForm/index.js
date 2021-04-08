import "./ParkingForm.css";
import { useState, useEffect } from "react";
import AdminNavbar from "../AdminNavbar";
import { Link, useParams, useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { startLoading, stopLoading, showAlert } from "../../actions/index";
import { connect } from "react-redux";
import Input from "../smallerComponents/Input";
import Button from "../smallerComponents/Button";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  startLoading: startLoading,
  stopLoading: stopLoading,
  showAlert: showAlert,
};

const ParkingForm = (props) => {
  const [parkingFormDetails, setParkingFormDetails] = useState({
    name: "",
    maxCapacity: "",
    height: "",
    length: "",
    width: "",
    price: "",
    parkingPoint: "",
    createdBy: jwtDecode(localStorage.getItem("token")).id,
  });

  const [parkingPoints, setParkingPoints] = useState([]);

  const history = useHistory();

  useEffect(() => {
    props.startLoading();
    axios
      .get(`${process.env.REACT_APP_API_URL}/parkingpoints/admin`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setParkingPoints(response.data.data);
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

  const { parkingId } = useParams();

  useEffect(() => {
    if (parkingId) {
      props.startLoading();
      axios
        .get(`${process.env.REACT_APP_API_URL}/parkings/parking/${parkingId}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setParkingFormDetails({
            ...response.data.data,
            parkingPoint: response.data.data.parkingPoint._id,
          });
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
    setParkingFormDetails({
      ...parkingFormDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.startLoading();
    axios
      .post(`${process.env.REACT_APP_API_URL}/parkings/`, parkingFormDetails, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setParkingFormDetails({
          name: "",
          maxCapacity: "",
          height: "",
          length: "",
          width: "",
          price: "",
          parkingPointId: "",
          createdBy: jwtDecode(localStorage.getItem("token")).id,
        });
        props.stopLoading();
        props.showAlert("Parking created successfully!");
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
          props.showAlert("Failed to create Parking!, Try again later.");
        }
        props.stopLoading();
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    props.startLoading();
    axios
      .put(`${process.env.REACT_APP_API_URL}/parkings/`, parkingFormDetails, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setParkingFormDetails(response.data.data);
        props.stopLoading();
        props.showAlert("Parking updated successfully!")
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
          props.showAlert("Failed to update Parking!, Try again later.");
        }
        props.stopLoading();
      });
  };

  return (
    <div className="ParkingForm main-container">
      <AdminNavbar />
      <main>
        <form onSubmit={parkingId ? handleUpdate : handleSubmit}>
          <h2>Create Parking</h2>
          <div className="form-fields">
            <Input
              name="name"
              label="Name"
              placeholder="Enter name here"
              minLength="1"
              maxLength="30"
              required
              value={parkingFormDetails.name}
              handleInputChange={handleInputChange}
            />
            <Input
              type="number"
              name="maxCapacity"
              label="Max Capacity"
              placeholder="Enter Max Capacity here"
              min="5"
              max="50"
              required
              value={parkingFormDetails.maxCapacity}
              handleInputChange={handleInputChange}
            />
            <Input
              type="number"
              name="height"
              label="Height"
              placeholder="Enter Height here"
              min="1"
              max="20"
              required
              value={parkingFormDetails.height}
              handleInputChange={handleInputChange}
            />
            <Input
              type="number"
              name="length"
              label="Length"
              placeholder="Enter Length here"
              min="3"
              max="50"
              required
              value={parkingFormDetails.length}
              handleInputChange={handleInputChange}
            />
            <Input
              type="number"
              name="width"
              label="Width"
              placeholder="Enter Width here"
              min="1"
              max="20"
              required
              value={parkingFormDetails.width}
              handleInputChange={handleInputChange}
            />
            <Input
              type="number"
              name="price"
              label="Price / hour"
              placeholder="Enter Price here"
              min="5"
              max="5000"
              required
              value={parkingFormDetails.price}
              handleInputChange={handleInputChange}
            />
            {parkingPoints && (
              <div className="form-child">
                <label htmlFor="parkingPoint">Parking Point</label>
                <select
                  name="parkingPoint"
                  id="parkingPoint"
                  value={parkingFormDetails.parkingPoint}
                  required
                  onChange={handleInputChange}
                >
                  <option value="">select</option>
                  {parkingPoints.map((parkingPoint) => {
                    return (
                      <option
                        key={`${parkingPoint._id}`}
                        value={parkingPoint._id}
                      >
                        {`${parkingPoint._id} - ${parkingPoint.name}`}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
          <div className="btns">
            <Button buttonType="pri-btn">
              {parkingId ? "Update" : "Submit"}
            </Button>
            {parkingId && (
              <Link to="/admin/parkings">
                <Button buttonType="sec-btn">Back</Button>
              </Link>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ParkingForm);
