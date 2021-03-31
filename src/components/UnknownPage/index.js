import "./UnknownPage.css";
import { Link } from "react-router-dom";

const UnknownPage = () => {
  return (
    <div className="UnknownPage">
      <h1>404 , Page not found!</h1>
      <Link to="/">
        <button>Go back to main page!</button>
      </Link>
    </div>
  );
};

export default UnknownPage;
