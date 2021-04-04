import "./AppNavbar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import iconSearchOutlined from "../../assets/images/icon-search-outlined.svg";
import { connect } from "react-redux";
import {
  startLoading,
  stopLoading,
  showAlert,
  setSearchText,
} from "../../actions/index";

import iconMenu from "../../assets/images/icon-menu.png";
import iconClose from "../../assets/images/icon-close.png";

import BrandLogo from "../smallerComponents/BrandLogo";
import Button from "../smallerComponents/Button";

const mapStateToProps = (state) => {
  return {
    error: state.error,
    searchText: state.searchText,
  };
};

const mapDispatchToProps = {
  startLoading: startLoading,
  stopLoading: stopLoading,
  showAlert: showAlert,
  setSearchText: setSearchText,
};

const AppNavbar = (props) => {
  const signout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload(false);
  };

  const [searchInput, setSearchInput] = useState(props.searchText || "");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    props.setSearchText(searchInput);
  };

  return (
    <nav className="AppNavbar">
      <BrandLogo />
      {window.location.pathname === "/search" && (
        <div className="search-input">
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
          <NavLink to="/home" activeClassName="active" exact>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/search" activeClassName="active" exact>
            Search
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile" activeClassName="active" exact>
            Profile
          </NavLink>
        </li>

        <li>
          <Button handleClick={signout} buttonType="danger-btn">
            Logout
          </Button>
        </li>
      </ul>

      <div className="menu">
        <img
          className="close-btn"
          onClick={() => {
            document.getElementsByClassName("menu")[0].style.width = "0";
            setIsMenuOpen(false);
          }}
          src={iconClose}
        />
        <ul>
          <li>
            <NavLink to="/home" activeClassName="active" exact>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/search" activeClassName="active" exact>
              Search
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" activeClassName="active" exact>
              Profile
            </NavLink>
          </li>

          <li>
            <Button handleClick={signout} buttonType="danger-btn">
              Logout
            </Button>
          </li>
        </ul>
      </div>

      {!isMenuOpen && (
        <img
          onClick={() => {
            document.getElementsByClassName("menu")[0].style.width = "70%";
            setIsMenuOpen(true);
          }}
          src={iconMenu}
          className="menu-btn"
        ></img>
      )}
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
