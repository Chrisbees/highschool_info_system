import React, { useState, useEffect } from "react";
import "../general.css";
import { useNavigate, useParams } from "react-router-dom";
import smImg from "../../assets/img1.jpg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./studentinfo.css";
import jwtDecode from "jwt-decode";
import {
  getStudent,
  deleteStudent,
  getStudentParent,
  getStudentCourses,
  generateStudentPDF,
  updateStudentImage,
  getStudentData,
} from "../../app/StudentAction";

import { Link } from "react-router-dom";
const StudentInfo = (props) => {
  const [student, setStudents] = useState([]);
  const [newstudent, setNewStudent] = useState([]);
  const [parent, setParents] = useState([]);
  const [courses, setCouses] = useState([]);
  const [activeTab, setActiveTab] = useState("about");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showButtons, setShowButton] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await props.getStudent(id, navigate);
        setStudents(response);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, []);

  useEffect(() => {
    const fetchParent = async () => {
      try {
        const response = await props.getStudentParent(id);
        setParents(response);
      } catch (error) {
        console.error("Error fetching parent:", error);
      }
    };

    fetchParent();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await props.getStudentCourses(id);
        setCouses(response);
        console.log(courses);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (token) {
          const decoded = jwtDecode(token);
          const user = decoded.entityId;
          const studentData = await props.getStudentData(user);
          setNewStudent(studentData);
          if (studentData.role === "STUDENT") {
            setShowButton(false);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const onClick = () => {
    props.deleteStudent(id, navigate);
  };

  const onClickGeneratePDF = async () => {
    try {
      // Generate the PDF using the updated student data

      const pdfBytes = await generateStudentPDF(id);
      if (pdfBytes) {
        const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleUploadButtonClick = () => {
    if (uploadingImage) {
      const shouldUpload = window.confirm(
        "Do you want to submit the selected image?"
      );
      if (shouldUpload) {
        submitImage();
      }
    } else {
      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
        fileInput.click();
      }
      setUploadingImage(true);
    }
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setUploadedImage(imageFile);
  };
  // Function to submit uploaded image
  const submitImage = async () => {
    if (uploadedImage) {
      try {
        const formData = new FormData();
        formData.append("imageFile", uploadedImage);

        // Call the updateStudentImage action to update the student's image
        await props.updateStudentImage(id, uploadedImage);

        // Clear the uploaded image after submission
        // setUploadedImage(null);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="container">
      <form method="">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img
                src={
                  uploadedImage
                    ? URL.createObjectURL(uploadedImage)
                    : student.imageData
                    ? `data:image/jpeg;base64,${student.imageData}`
                    : smImg
                }
                alt="thapa"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="profile-head">
              <div className="row">
                <div className="row">
                  <div className="col-md-6">
                    <h6>First Name:</h6>
                  </div>
                  <div className="col-md-6">{student.firstname}</div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <h6>Last Name:</h6>
                  </div>
                  <div className="col-md-6">{student.lastname}</div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Gender:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{student.gender}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Email:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{student.email}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Date of birth:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{student.dob}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Nationality:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{student.nationality}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>State of origin: </h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{student.state}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Ethnicity:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{student.ethnicity}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Home Address:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{student.address}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Phone Number:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{student.phone}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Emergency Contact:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{student.emergency}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Grade:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{student.grade}</h6>
                  </div>
                </div>
              </div>
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      activeTab === "about" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("about")}
                    id="home-tab"
                    data-toggle="tab"
                    to="#"
                    role="tab"
                  >
                    More
                  </Link>

                  <li className="nav-item">
                    <div className="nav-link-container">
                      <Link
                        className={`nav-link ${
                          activeTab === "timeline" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("timeline")}
                        role="tab"
                        id="profile-tab"
                        data-toggle="tab"
                        to="#"
                      >
                        Courses
                      </Link>
                    </div>
                  </li>
                  <li
                    className="nav-indicator"
                    style={{ left: activeTab === "about" ? "0" : "16%" }}
                  ></li>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-2">
            <div className="row">
              <div className="col-sm">
                {showButtons && (
                  <Link
                    to={`/updatestudents/${student.id}`}
                    className="btn1"
                    name="btnAddMore"
                  >
                    Edit Student
                  </Link>
                )}
              </div>
              <div className="col-sm mt-3">
                {showButtons && (
                  <Link
                    to="#"
                    className="btn btn-danger btn1"
                    name="btnAddMore"
                    onClick={onClick}
                  >
                    Delete Student
                  </Link>
                )}
              </div>
              <div className="col-sm mt-3">
                {showButtons && (
                  <Link
                    to=""
                    className="btn btn-primary"
                    onClick={handleUploadButtonClick}
                  >
                    {uploadingImage ? "Submit  " : "Edit Image"}
                  </Link>
                )}
                <input
                  type="file"
                  id="fileInput"
                  name="imageFile"
                  onChange={handleImageUpload}
                  style={{ display: "none" }} // Hide the file input
                />
              </div>
              <div className="col-sm mt-3">
                <Link
                  to={`/student/${student.id}`}
                  className="btn btn-primary btn1"
                  onClick={onClickGeneratePDF}
                >
                  Print Data
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/*left side url */}
          <div className="col-md-4">
            <div className="profile-work">
              <p>Parent/Guardian Information</p>
              <h6>
                Parent/Guardian Name: {parent.firstName} {parent.lastName}
              </h6>
              <h6>Relationship to Student:{parent.relationship_to_student}</h6>
              <h6>Phone Number: {parent.contact}</h6>
              <h6>Gender: {parent.gender}</h6>
              <h6>Occupation: {parent.occupation}</h6>
              <h6>Employer: {parent.employer}</h6>
            </div>
          </div>
          <div className="col-md-8 pl-5 about-info">
            <div className="tab-content profile-tab" id="myTabContent">
              <div
                className={`tab-pane fade ${
                  activeTab === "about" ? "show active" : ""
                }`}
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Preferred Language:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{student.language}</h6>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Extra Curricular Activities/Interests:</h6>
                  </div>
                  <div className="col-md-6">{student.interest}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Special Education Needs:</h6>
                  </div>
                  <div className="col-md-6">{student.specialNeeds}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Transport Preferred</h6>
                  </div>
                  <div className="col-md-6">{student.transport}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Photograph Release Consent:</h6>
                  </div>
                  <div className="col-md-6">{student.photoConsent}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Internet Consent:</h6>
                  </div>
                  <div className="col-md-6">{student.internet}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Moral Conduct:</h6>
                  </div>
                  <div className="col-md-6">{student.moralConduct}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Academic Performance:</h6>
                  </div>
                  <div className="col-md-6">{student.academicPerformance}</div>
                </div>
              </div>

              <div
                className={`tab-pane fade ${
                  activeTab === "timeline" ? "show active" : ""
                }`}
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>List of Student Courses:</h6>
                  </div>
                  <div className="col-md-6">
                    <ul>
                      {courses.map((course) => (
                        <li key={course.id}>{course.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

StudentInfo.propTypes = {
  student: PropTypes.object.isRequired,
  getStudent: PropTypes.func.isRequired,
  getStudentParent: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  student: state.student,
  security: state.security,
});
export default connect(mapStateToProps, {
  deleteStudent,
  getStudent,
  getStudentParent,
  generateStudentPDF,
  updateStudentImage,
  getStudentCourses,
  getStudentData,
})(StudentInfo);
