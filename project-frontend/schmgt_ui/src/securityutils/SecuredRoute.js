import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import AllStudents from "../components/students/AllStudents";

const SecuredRoute = ({ security, component: Component, ...rest }) => {
  return security.validToken ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/" />
  );
};

SecuredRoute.propTypes = {
  security: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  security: state.security,
});
export default connect(mapStateToProps)(SecuredRoute);
