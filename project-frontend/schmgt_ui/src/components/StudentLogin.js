import React, { Component, useEffect, useState } from "react";
import bgImg from "../assets/student2.jpg";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { studentlogin } from "../app/SecurityActions";
import classNames from "classnames";
import "./Login.css";

function StudentLogin(props) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (props.security.validToken) {
      const userId = props.security.user.entityId; // Access the userId from the Redux store
      navigate(`/student/${userId}`);
    }
  }, [props.security.validToken, props.security.user, navigate]);

  const onSubmit = (data) => {
    const user = getValues();
    props.studentlogin(user);

    console.log(user);
  };
  // console.log(watch('username'));

  return (
    <section className="loginform">
      <div className="login">
        <div className="first-col">
          <h2>Student Login</h2>
          <span>Login to use service</span>
          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("username", { required: true, maxLength: 25 })}
              placeholder="username"
              name="username"
            />
            {errors.username?.type === "required" && "Username is required"}
            {errors.username?.type === "maxLength" && "Max Length Exceed"}
            <input
              type="password"
              {...register("password", { required: true, maxLength: 15 })}
              placeholder="password"
              name="password"
            />
            {errors.password?.type === "required" && "Password is required"}
            {errors.password?.type === "maxLength" && "Max Length Exceed"}
            <button className="btn" type="submit">
              Sign In
            </button>
            <Link to="/" className="btn">
              Cancel
            </Link>
          </form>
        </div>
        <div className="secondcol-2">
          <img src={bgImg} alt="" />
        </div>
      </div>
    </section>
  );
}

StudentLogin.propTypes = {
  studentlogin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { studentlogin })(StudentLogin);
