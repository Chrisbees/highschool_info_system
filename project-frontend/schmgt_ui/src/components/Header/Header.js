import React, { useState } from "react";
import "../general.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../app/SecurityActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Header = (props) => {
  const logout = () => {
    props.logout();
    window.location.href = "/";
  };
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const { navigate } = useNavigate();

  const { validToken } = props.security;

  return (
    <header className="header">
      <div className="container header-contain">
        <div className="header-left">
          <h1>School Management</h1>
        </div>
        <div className="header-right">
          <button className="toggle-button" onClick={toggleNav}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
      <div className={`navToggle ${isNavOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        {validToken ? (
          <Link to="/allstudents">Students</Link>
        ) : (
          <Link to="/">Students</Link>
        )}
        <Link to="/allstaff">Staff</Link>
        <Link to="">Contact</Link>
        <Link to="/" onClick={logout}>
          Logout
        </Link>
      </div>
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});
export default connect(mapStateToProps, { logout })(Header);
