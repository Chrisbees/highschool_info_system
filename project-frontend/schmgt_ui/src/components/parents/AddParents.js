import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "../students/addstudent.css"; // Import the CSS file
import { getStudent, addParents } from "../../app/StudentAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function AddParents(props) {
  const [student, setStudent] = useState([]);
  const { register, getValues, handleSubmit, reset, errors } = useForm();

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    props
      .getStudent(id, navigate)
      .then((result) => {
        setStudent(result);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(student);
    if (props.errors) {
      // setValue({ errors: props.errors })
      console.log(props.errors);
    }
  }, []);

  const onSubmit = () => {
    const newParent = getValues();
    props.addParents(id, newParent, navigate);
    console.log(newParent);
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
            {...register("firstName", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="lastname"
            placeholder="last name"
            {...register("lastName", { required: true })}
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
            name="contact"
            placeholder="contact"
            {...register("contact", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="occupation"
            placeholder="occupation"
            {...register("occupation", { required: true })}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="relationship_to_student"
            placeholder="relationship"
            {...register("relationship_to_student", { required: true })}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="employer"
            placeholder="employer"
            {...register("employer", { required: true })}
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

AddParents.propTypes = {
  getStudent: PropTypes.func.isRequired,
  //   errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student,
  errors: state.errors,
});

export default connect(mapStateToProps, { getStudent, addParents })(AddParents);
