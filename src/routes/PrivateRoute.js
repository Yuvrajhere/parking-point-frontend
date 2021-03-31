import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          localStorage.getItem("token") &&
          localStorage.getItem("token").length > 0
        ) {
          if (jwt_decode(localStorage.getItem("token")).isAdmin) {
            return <Redirect to="admin" />;
          } else {
            return <Component {...props} />;
          }
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
