import React, { Component, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "../students/addstudent.css"; // Import the CSS file
import { getStaff, updateStaff } from "../../app/StaffActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function UpdateStaff(props) {
  const { register, getValues, handleSubmit, reset, errors } = useForm();

  const [staff, setStaff] = useState([]);
  const defaultValues = {
    id: staff.id,
    firstname: staff.firstname,
    lastname: staff.lastname,
    gender: staff.gender,
    username: staff.username,
    password: staff.password,
    email: staff.email,
    dob: staff.dob,
    nationality: staff.nationality,
    state: staff.state,
    ethnicity: staff.ethnicity,
    address: staff.address,
    phone: staff.phone,
    emergency: staff.emergency,
    grade: staff.grade,
    qualifications: staff.qualifications,
    language: staff.language,
    interest: staff.interest,
    specialNeeds: staff.specialNeeds,
    transport: staff.transport,
    internet: staff.internet,
    photoConsent: staff.photoConsent,
  };

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    props
      .getStaff(id, navigate)
      .then((result) => {
        setStaff(result);
        reset(result);
      })
      .catch((err) => {
        console.log(err);
      });
    if (props.errors) {
      // setValue({ errors: props.errors })
      console.log(props.errors);
    }
  }, [reset]);

  const onSubmit = () => {
    const newStaff = getValues();
    props.updateStaff(id, newStaff, navigate);
    console.log(newStaff);
  };
  return (
    <div className="form-container">
      <h2>Update Staff</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
        {/* Personal Information */}
        <div className="form-row">
          <input
            type="text"
            name="firstname"
            placeholder="first name"
            {...register("firstname", { required: true })}
            defaultValues={defaultValues.firstname}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="lastname"
            placeholder="last name"
            {...register("lastname", { required: true })}
            defaultValues={defaultValues.lastname}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="gender"
            placeholder="gender"
            {...register("gender", { required: true })}
            defaultValues={defaultValues.gender}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="qualifications"
            placeholder="Qualifications"
            {...register("qualifications", { required: true })}
            defaultValues={defaultValues.qualifications}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="username"
            placeholder="username"
            {...register("username", { required: true })}
            defaultValues={defaultValues.username}
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
            defaultValues={defaultValues.email}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="dob"
            placeholder="date of birth"
            {...register("dob", { required: true })}
            defaultValues={defaultValues.dob}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="nationality"
            placeholder="nationality"
            {...register("nationality", { required: true })}
            defaultValues={defaultValues.nationality}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="state"
            placeholder="state"
            {...register("state", { required: true })}
            defaultValues={defaultValues.state}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="ethnicity"
            placeholder="ethnicity"
            {...register("ethnicity", { required: true })}
            defaultValues={defaultValues.ethnicity}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="address"
            placeholder="address"
            {...register("address", { required: true })}
            defaultValues={defaultValues.address}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="phone"
            placeholder="phone"
            {...register("phone", { required: true })}
            defaultValues={defaultValues.phone}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="emergency"
            placeholder="emergency"
            {...register("emergency", { required: true })}
            defaultValues={defaultValues.emergency}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="grade"
            placeholder="class grade"
            {...register("grade", { required: true })}
            defaultValues={defaultValues.grade}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="language"
            placeholder="language"
            {...register("language", { required: true })}
            defaultValues={defaultValues.language}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="interest"
            placeholder="interest"
            {...register("interest", { required: true })}
            defaultValues={defaultValues.interest}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="specialNeeds"
            placeholder="Special Needs"
            {...register("specialNeeds", { required: true })}
            defaultValues={defaultValues.specialNeeds}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="transport"
            placeholder="transport"
            {...register("transport", { required: true })}
            defaultValues={defaultValues.transport}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="internet"
            placeholder="internet"
            {...register("internet", { required: true })}
            defaultValues={defaultValues.internet}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="photoConsent"
            placeholder="Photo Consent"
            {...register("photoConsent", { required: true })}
            defaultValues={defaultValues.photoConsent}
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

UpdateStaff.propTypes = {
  getStaff: PropTypes.func.isRequired,
  updateStaff: PropTypes.func.isRequired,
  staff: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  staff: state.staff,
  errors: state.errors,
});
export default connect(mapStateToProps, { getStaff, updateStaff })(UpdateStaff);
