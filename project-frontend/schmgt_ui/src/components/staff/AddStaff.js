import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../students/addstudent.css"; // Import the CSS file
import { createStaff } from "../../app/StaffActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function AddStaff(props) {
  const { register, getValues, handleSubmit, errors } = useForm();

  const navigate = useNavigate();
  const onSubmit = () => {
    const staff = getValues();
    const send = props.createStaff(staff, navigate);
  };

  return (
    <div className="form-container">
      <h2>Staff Registration Form</h2>
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
            placeholder="Date of birth"
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
            name="State_of_origin"
            placeholder="State of origin"
            {...register("State_of_origin", { required: true })}
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
            name="home_address"
            placeholder="home address"
            {...register("home_address", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="phone_number"
            placeholder="phone number"
            {...register("phone_number", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="emergency_contact"
            placeholder="emergency contact"
            {...register("emergency_contact", { required: true })}
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
        <div className="form-row">
          <input
            type="text"
            name="preferred_language"
            placeholder="preferred language"
            {...register("preferred_language", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="role"
            placeholder="role"
            {...register("role", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="special_needs"
            placeholder="special needs"
            {...register("special_needs", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="transport"
            placeholder="transport preferred"
            {...register("transport", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="photograph_release"
            placeholder="photograph release consent"
            {...register("photograph_release", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="internet_consent"
            placeholder="internet consent"
            {...register("internet_consent", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="moral_conduct"
            placeholder="moral conduct"
            {...register("moral_conduct", { required: true })}
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

AddStaff.propTypes = {
  createStaff: PropTypes.func.isRequired,
  //   errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createStaff })(AddStaff);
