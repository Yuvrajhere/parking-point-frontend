import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import AdminRoute from "./routes/AdminRoute";
import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ParkingPointForm from "./components/ParkingPointForm";
import ParkingPointsAdminView from "./components/ParkingPointsAdminView";
import ParkingForm from "./components/ParkingForm";
import ParkingAdminView from "./components/ParkingAdminView";
import ParkingPointDetailsAdminView from "./components/ParkingPointDetailsAdminView";
import Loading from "./components/Loading";
import UserProfile from "./components/UserProfile";
import UserProfileEdit from "./components/UserProfileEdit";
import Search from "./components/Search";
import ParkingPoint from "./components/ParkingPoint";
import UnknownPage from "./components/UnknownPage";
import Alert from "./components/Alert";
import Book from "./components/Book";
import Navigation from "./components/Navigation";

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    alert: state.alert,
  };
};

const App = (props) => {

  return (
    <Router>
      <div className="App">

        {props.loading && <Loading />}
        {props.alert && <Alert />}

        <Switch>
          <PublicRoute component={Signup} path="/signup" exact />
          <PublicRoute component={Login} path="/login" exact />
          <PublicRoute component={LandingPage} path="/" exact />
          <PublicRoute component={AdminLogin} path="/adminlogin" exact />
          <PrivateRoute component={Navigation} path="/navigate" exact/>
          <PrivateRoute component={Book} path="/book/:parkingId" exact/>
          <PrivateRoute component={ParkingPoint} path="/parkingpoint/:parkingPointId" exact />
          <PrivateRoute component={Search} path="/search" exact />
          <PrivateRoute component={UserProfileEdit} path="/profile/edit" exact />
          <PrivateRoute component={UserProfile} path="/profile" exact />
          <PrivateRoute component={Home} path="/home" exact />
          <AdminRoute component={ParkingForm} path="/admin/parking/edit/:parkingId" exact />
          <AdminRoute component={ParkingForm} path="/admin/parkings/new" exact />
          <AdminRoute component={ParkingAdminView} path="/admin/parkings/" exact />
          <AdminRoute component={ParkingPointForm} path="/admin/parkingpoint/edit/:parkingPointId" exact />
          <AdminRoute component={ParkingPointDetailsAdminView} path="/admin/parkingpoint/details/:parkingPointId" exact />
          <AdminRoute component={ParkingPointForm} path="/admin/parkingpoints/new" exact />
          <AdminRoute component={ParkingPointsAdminView} path="/admin/parkingpoints" exact />
          <AdminRoute component={AdminDashboard} path="/admin" exact />
          <Route component={UnknownPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(mapStateToProps, null)(App);
