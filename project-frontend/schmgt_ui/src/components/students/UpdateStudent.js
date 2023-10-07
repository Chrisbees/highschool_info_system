import React, { Component, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./addstudent.css"; // Import the CSS file
import { updateStudent, getStudent } from "../../app/StudentAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function UpdateStudents(props) {
  const { register, getValues, handleSubmit, reset, errors } = useForm();

  const [student, setStudent] = useState([]);
  const defaultValues = {
    id: student.id,
    firstname: student.firstname,
    lastname: student.lastname,
    gender: student.gender,
    username: student.username,
    password: student.password,
    email: student.email,
    dob: student.dob,
    nationality: student.nationality,
    state: student.state,
    ethnicity: student.ethnicity,
    address: student.address,
    phone: student.phone,
    emergency: student.emergency,
    grade: student.grade,
    moralConduct: student.moralConduct,
    language: student.language,
    interest: student.interest,
    specialNeeds: student.specialNeeds,
    transport: student.transport,
    internet: student.internet,
    photoConsent: student.photoConsent,
    academicPerformance: student.academicPerformance,
  };

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    props
      .getStudent(id, navigate)
      .then((result) => {
        setStudent(result);
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
    const newStudent = getValues();
    props.updateStudent(id, newStudent, navigate);
    console.log(newStudent);
  };
  return (
    <div className="form-container">
      <h2>Update Student</h2>
      <Link
        to={`/student/${student.id}/addparent`}
        className="btn1 "
        name="btnAddMore"
      >
        Add Parent
      </Link>
      <Link
        to={`/student/${student.id}/addcourse`}
        className="btn btn-secondary m-2"
        name="btnAddMore"
      >
        Add Courses
      </Link>
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
          <label htmlFor="conduct">Moral Conduct:</label>
          <select
            id="conduct"
            name="moralConduct"
            {...register("moralConduct", { required: true })}
            defaultValues={defaultValues.moralConduct}
          >
            <option value="">Select a conduct</option>
            <option>Satisfactory</option>
            <option>Good</option>
            <option>Excellent</option>
            <option>Easily Distracted</option>
            <option>Bad</option>
            <option>Too playful</option>
            <option>Unserious</option>
            <option>Violent</option>

            {/* Add more courses here */}
          </select>
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
            defaultValues={defaultValues.firstname}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="dob"
            placeholder="date of birth"
            {...register("dob", { required: true })}
            defaultValues={defaultValues.gender}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="nationality"
            placeholder="nationality"
            {...register("nationality", { required: true })}
            defaultValues={defaultValues.username}
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
            defaultValues={defaultValues.firstname}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="address"
            placeholder="address"
            {...register("address", { required: true })}
            defaultValues={defaultValues.username}
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
            placeholder="grade"
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
        <div className="form-row">
          <input
            type="text"
            name="academicPerformance"
            placeholder="Academic Performance"
            {...register("academicPerformance", { required: true })}
            defaultValues={defaultValues.academicPerformance}
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

UpdateStudents.propTypes = {
  getStudent: PropTypes.func.isRequired,
  updateStudent: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student.student,
  errors: state.errors,
});
export default connect(mapStateToProps, { getStudent, updateStudent })(
  UpdateStudents
);
