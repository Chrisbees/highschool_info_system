import React, { useState, useEffect } from "react";
import "../general.css";
import staffs from "../../data/data";
import { Link } from "react-router-dom";
import smImg from "../../assets/img1.jpg";
import { getStaffs } from "../../app/StaffActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AllStaff = (props) => {
  const [staffs, setStaffs] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchByFirstName, setSearchByFirstName] = useState("");

  const searchTermValue = searchTerm.toLowerCase();

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await props.getStaffs();
        setStaffs(response);
        console.log(staffs);
      } catch (error) {
        console.error("Error fetching staffs:", error);
      }
    };

    fetchStaffs();
  }, []);

  //   ======== search data by FirstName =====

  const firstNameSearchHandler = () => {
    const filteredData = staffs.filter((staff) =>
      staff.firstname.toLowerCase().includes(searchByFirstName.toLowerCase())
    );
    setStaffs(filteredData);
  };

  // ======== Filter data by part-time, full-time, freelance etc======
  const filterStudentData = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "full-time") {
      const filteredData = staffs.filter(
        (staff) => staff.contract === "Full Time"
      );
      setStaffs(filteredData);
    } else if (filterValue === "part-time") {
      const filteredData = staffs.filter(
        (staff) => staff.contract === "Part Time"
      );
      setStaffs(filteredData);
    } else if (filterValue === "freelance") {
      const filteredData = staffs.filter(
        (staff) => staff.contract === "Freelance"
      );
      setStaffs(filteredData);
    } else if (filterValue === "contract") {
      const filteredData = staffs.filter(
        (staff) => staff.contract === "Contract"
      );
      setStaffs(filteredData);
    } else {
      setStaffs(staffs);
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
                placeholder="Search by title, companies"
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
              <button className="btn" onClick={firstNameSearchHandler}>
                Search
              </button>
            </div>

            <div className="search__panel-03">
              <select onChange={filterStudentData}>
                <option>Filter staff by</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="freelance">Freelance</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div className="search__panel-03">
              <Link to="/addstaff" className="btn1">
                Add Staff
              </Link>
            </div>
          </div>

          <div className="jobs__wrapper">
            {staffs
              ?.filter((staff) => {
                if (searchTerm === "") return staff;
                if (
                  staff.firstname.toLowerCase().includes(searchTermValue) ||
                  staff.lastname.toLowerCase().includes(searchTermValue)
                )
                  return staff;
              })
              .map((staff) => (
                <Link to={`/staff/${staff.id}`} className="card-link">
                  <div className="job__item" key={staff.id}>
                    <img
                      src={
                        staff.imageData
                          ? `data:image/jpeg;base64,${staff.imageData}`
                          : smImg
                      }
                      alt=""
                    />

                    <div className="job__content">
                      <h6>
                        Name: {staff.firstname} - {staff.lastname}
                      </h6>
                      <h6>{staff.email}</h6>
                      <p>Gender: {staff.gender}</p>

                      <div className="FirstName">
                        <p>
                          Username: <span>{staff.username}</span>
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

AllStaff.propTypes = {
  staff: PropTypes.object.isRequired,
  getStaffs: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  staff: state.staff,
  security: state.security,
});
export default connect(mapStateToProps, { getStaffs })(AllStaff);
