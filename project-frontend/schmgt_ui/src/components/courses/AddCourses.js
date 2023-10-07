import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "../students/addstudent.css"; // Import the CSS file
import { getStudent, addCourses } from "../../app/StudentAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function AddCourses(props) {
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
    const newCourses = getValues();
    props.addCourses(id, newCourses, navigate);
    console.log(newCourses);
  };

  return (
    <div className="form-container">
      <h2>Add Courses</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
        {/* Personal Information */}
        <div className="form-row">
          <label htmlFor="course">Select a Course:</label>
          <select
            id="course"
            name="name"
            {...register("name", { required: true })}
          >
            <option>Select a course</option>
            <option>English</option>
            <option>Mathematics</option>
            <option>Biology</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Animal Husbandry</option>
            <option>Home Economics</option>
            <option>Civic Education</option>
            <option>Intro Tech</option>
            <option>Agricultural Science</option>
            <option>Business Studies</option>
            <option>Government</option>
            <option>Literature</option>

            {/* Add more courses here */}
          </select>
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

AddCourses.propTypes = {
  getStudent: PropTypes.func.isRequired,
  //   errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student,
  errors: state.errors,
});

export default connect(mapStateToProps, { getStudent, addCourses })(AddCourses);
