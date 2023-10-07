import React, { useState, useEffect } from "react";
import "../general.css";
import { useNavigate, useParams } from "react-router-dom";
import smImg from "../../assets/img1.jpg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../students/studentinfo.css";
import jwtDecode from "jwt-decode";
import {
  getStaff,
  deleteStaff,
  generateStaffPDF,
  updateStaffImage,
  getStaffData,
} from "../../app/StaffActions";

import { Link } from "react-router-dom";

const StaffInfo = (props) => {
  const [staff, setStaffs] = useState([]);
  const [newStaff, setNewStaff] = useState([]);
  const [activeTab, setActiveTab] = useState("about");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showButtons, setShowButton] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await props.getStaff(id, navigate);
        setStaffs(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    fetchStaff();
  }, []);

  const onClick = () => {
    props.deleteStaff(id, navigate);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (token) {
          const decoded = jwtDecode(token);
          const user = decoded.entityId;
          const staffData = await props.getStaffData(user);
          setNewStaff(staffData);
          if (staffData.role === "STAFF") {
            setShowButton(false);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  const onClickGeneratePDF = async () => {
    try {
      // Generate the PDF using the updated staff data

      const pdfBytes = await generateStaffPDF(id);
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

        // Call the updateStudentImage action to update the staff's image
        await props.updateStaffImage(id, uploadedImage);

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
                    : staff.imageData
                    ? `data:image/jpeg;base64,${staff.imageData}`
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
                  <div className="col-md-6">{staff.firstname}</div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <h6>Last Name:</h6>
                  </div>
                  <div className="col-md-6">{staff.lastname}</div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Gender:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{staff.gender}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Email:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{staff.email}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Date of birth:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{staff.dob}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Nationality:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{staff.nationality}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>State of origin:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{staff.state}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Ethnicity:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{staff.ethnicity}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Home Address:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{staff.address}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Phone Number:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{staff.phone}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Emergency Contact:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{staff.emergency}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Class Grade:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6>{staff.grade}</h6>
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
                        Qualifications
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
                    to={`/updatestaff/${staff.id}`}
                    className="btn btn-primary"
                    name="btnAddMore"
                  >
                    Edit Staff
                  </Link>
                )}
              </div>
              <div className="col-sm mt-3">
                {showButtons && (
                  <Link
                    to="#"
                    className="btn btn-danger"
                    name="btnAddMore"
                    onClick={onClick}
                  >
                    Delete Staff
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
                  to={`/staff/${staff.id}`}
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
              <p>Guarantor Information</p>
              <h6>Guarantor Name:</h6>
              <h6>Relationship to Student:</h6>
              <h6>Phone Number:</h6>
              <h6>Email:</h6>
              <h6>Occupation:</h6>
              <h6>Employer:</h6>
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
                    <h6>{staff.language}</h6>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Extra Curricular Activities/Interests:</h6>
                  </div>
                  <div className="col-md-6">{staff.interest}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Special Education Needs:</h6>
                  </div>
                  <div className="col-md-6">{staff.specialNeeds}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Transport Preferred</h6>
                  </div>
                  <div className="col-md-6">{staff.transport}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Photograph Release Consent:</h6>
                  </div>
                  <div className="col-md-6">{staff.photoConsent}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Internet Consent:</h6>
                  </div>
                  <div className="col-md-6">{staff.internet}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Qualifications:</h6>
                  </div>
                  <div className="col-md-6">{staff.qualifications}</div>
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
                    <h6>List Qualifications:</h6>
                  </div>
                  <div className="col-md-6">
                    <p>Answer</p>
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

StaffInfo.propTypes = {
  staff: PropTypes.object.isRequired,
  getStaff: PropTypes.func.isRequired,
  deleteStaff: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  staff: state.staff,
  security: state.security,
});
export default connect(mapStateToProps, {
  deleteStaff,
  getStaff,
  getStaffData,
  generateStaffPDF,
  updateStaffImage,
})(StaffInfo);
