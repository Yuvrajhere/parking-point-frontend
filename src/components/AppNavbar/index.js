import "./AppNavbar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import parkingPointLogo from "../../assets/images/parking-point-logo.png";
import iconSearchOutlined from "../../assets/images/icon-search-outlined.svg";
import { connect } from "react-redux";
import { startLoading, stopLoading, showError, setSearchText } from "../../actions/index";
import axios from "axios";

const mapStateToProps = (state) => {
  return {
    error: state.error,
    searchText: state.searchText
  };
};

const mapDispatchToProps = {
  startLoading: startLoading,
  stopLoading: stopLoading,
  showError: showError,
  setSearchText: setSearchText
};

const AppNavbar = (props) => {
  const signout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload(false);
  };

  const [searchInput, setSearchInput] = useState(props.searchText || "");

  const handleClick = (e) => {
    e.preventDefault();
    props.setSearchText(searchInput);
  }

  return (
    <div className="AppNavbar">
      <nav>
        <h2>
          <img src={parkingPointLogo} />
          <span>P</span>arking <span> P</span>oint
        </h2>
        {window.location.pathname === "/search" && (
          <div className="home-search">
            <input
              type="text"
              placeholder="Search with city names"
              name="searchInput"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <button onClick={handleClick}>
              <img src={iconSearchOutlined} />
            </button>
          </div>
        )}
        <ul>
          <li>
            <NavLink
              to="/home"
              activeClassName="landing-page-active-link"
              exact
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/search"
              activeClassName="landing-page-active-link"
              exact
            >
              Search
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              activeClassName="landing-page-active-link"
              exact
            >
              Profile
            </NavLink>
          </li>

          <li>
            <button onClick={signout} className="logout">
              logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
