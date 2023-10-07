import React, { useState, useEffect } from "react";
import "../general.css";
import students from "../../data/data";
import { Link } from "react-router-dom";
import smImg from "../../assets/img1.jpg";
import { getStudents } from "../../app/StudentAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AllStudents = (props) => {
  const [students, setStudents] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchByFirstName, setSearchByFirstName] = useState("");

  const searchTermValue = searchTerm.toLowerCase();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await props.getStudents();
        setStudents(response);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  //   ======== search data by FirstName =====

  const firstNameSearchHandler = () => {
    const filteredData = students.filter((student) =>
      student.firstname.toLowerCase().includes(searchByFirstName.toLowerCase())
    );
    setStudents(filteredData);
  };

  // ======== Filter data by part-time, full-time, freelance etc======
  const filterStudentData = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "full-time") {
      const filteredData = students.filter(
        (student) => student.contract === "Full Time"
      );
      setStudents(filteredData);
    } else if (filterValue === "part-time") {
      const filteredData = students.filter(
        (student) => student.contract === "Part Time"
      );
      setStudents(filteredData);
    } else if (filterValue === "freelance") {
      const filteredData = students.filter(
        (student) => student.contract === "Freelance"
      );
      setStudents(filteredData);
    } else if (filterValue === "contract") {
      const filteredData = students.filter(
        (student) => student.contract === "Contract"
      );
      setStudents(filteredData);
    } else {
      setStudents(students);
    }
  };

  return (
    <section className="job__list">
      <div className="container">
        <div className="job__list__wrapper">
          <div className="search__panel">
            <div className="search__panel-01">
              <span>
                <i class="ri-search-line"></i>
              </span>
              <input
                type="text"
                placeholder="Search by first, lastname"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="search__panel-02">
              <span>
                <i class="ri-map-pin-line"></i>
              </span>
              <input
                type="text"
                placeholder="Search by FirstName"
                value={searchByFirstName}
                onChange={(e) => setSearchByFirstName(e.target.value)}
              />
              <button className="btn1" onClick={firstNameSearchHandler}>
                Search
              </button>
            </div>

            <div className="search__panel-03">
              <select onChange={filterStudentData}>
                <option>Filter student by</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="freelance">Freelance</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div className="search__panel-03">
              <Link to="/addstudents" className="btn1">
                Add Student
              </Link>
            </div>
          </div>

          <div className="jobs__wrapper">
            {students
              ?.filter((student) => {
                if (searchTerm === "") return student;
                if (
                  student.firstname.toLowerCase().includes(searchTermValue) ||
                  student.lastname.toLowerCase().includes(searchTermValue)
                )
                  return student;
              })
              .map((student) => (
                <Link to={`/student/${student.id}`} className="card-link">
                  <div className="job__item" key={student.id}>
                    <img
                      src={
                        student.imageData
                          ? `data:image/jpeg;base64,${student.imageData}`
                          : smImg
                      }
                      alt=""
                    />

                    <div className="job__content">
                      <h6>
                        Name: {student.firstname} - {student.lastname}
                      </h6>
                      <h6>Email: {student.email}</h6>
                      <p>Gender: {student.gender}</p>

                      <div className="FirstName">
                        <p>
                          Grade: <span>{student.grade}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

AllStudents.propTypes = {
  student: PropTypes.object.isRequired,
  getStudents: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  student: state.student,
  security: state.security,
});
export default connect(mapStateToProps, { getStudents })(AllStudents);
