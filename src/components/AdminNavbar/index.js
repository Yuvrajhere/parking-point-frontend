import "./AdminNavbar.css";
import { NavLink } from "react-router-dom";
import parkingPointLogo from "../../assets/images/parking-point-logo.png";

const AdminNavbar = () => {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload(false);
  };

  return (
    <div className="AdminNavbar">
      <nav>
        <h2>
          <img src={parkingPointLogo} />
          <span>P</span>arking <span> P</span>oint
        </h2>
        <ul>
          <li>
            <NavLink
              to="/admin"
              activeClassName="landing-page-active-link"
              exact
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <button onClick={logout} className="logout">
              logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNavbar;
