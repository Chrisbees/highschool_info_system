import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./addstudent.css"; // Import the CSS file
import { createStudent } from "../../app/StudentAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function AddStudents(props) {
  const { register, getValues, handleSubmit, errors } = useForm();

  const navigate = useNavigate();
  const onSubmit = () => {
    const student = getValues();
    const send = props.createStudent(student, navigate);
  };

  return (
    <div className="form-container">
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
        {/* Personal Information */}
        <div className="form-row">
          <input
            type="text"
            name="firstname"
            placeholder="first name"
            {...register("firstname", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="lastname"
            placeholder="last name"
            {...register("lastname", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="gender"
            placeholder="gender"
            {...register("gender", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="username"
            placeholder="username"
            {...register("username", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="password"
            name="password"
            placeholder="password"
            {...register("password", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="email"
            placeholder="email"
            {...register("email", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="dob"
            placeholder="date of birth"
            {...register("dob", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="nationality"
            placeholder="nationality"
            {...register("nationality", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="state"
            placeholder="state"
            {...register("state", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="ethnicity"
            placeholder="ethnicity"
            {...register("ethnicity", { required: true })}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="address"
            placeholder="address"
            {...register("address", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="phone"
            placeholder="phone"
            {...register("phone", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="emergency"
            placeholder="emergency"
            {...register("emergency", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="grade"
            placeholder="grade"
            {...register("grade", { required: true })}
          />
        </div>
        {/* {errors.firstname && (
          <span className="error-message">Full name is required</span>
        )}

       Other form fields go here... */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

AddStudents.propTypes = {
  createStudent: PropTypes.func.isRequired,
  //   errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createStudent })(AddStudents);
