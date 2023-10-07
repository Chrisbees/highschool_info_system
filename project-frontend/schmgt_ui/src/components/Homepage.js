import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css";

function Homepage() {
  return (
    <div>
      <div className="background_container">
        <div className="text-center">
          <h1>Welcome</h1>
          <p>Please select from the options below</p>
          <div className="mt-4">
            <Link to="/admin/login" className="btn btn-primary m-2">
              Admin
            </Link>
            <Link to="/student/login" className="btn btn-primary m-2">
              Student
            </Link>
            <Link to="/parents/login" className="btn btn-primary m-2">
              Parent
            </Link>
            <Link to="/staff/login" className="btn btn-primary m-2">
              Staff
            </Link>
          </div>
        </div>
      </div>

      <div className="news-section">
        <h1>School News section</h1>
        <div className="row">
          <div className="col-md-6">
            <h2>School Calendar</h2>
            <p>
              Stay up-to-date with important school events and dates for the
              upcoming academic year. Our school calendar includes
              parent-teacher conferences, holidays, exam periods, and more. Be
              sure to mark these dates on your calendar to ensure you don't miss
              out on any essential events.
            </p>
            <ul>
              <li>First Day of School: September 1</li>
              <li>Parent-Teacher Conferences: October 15-16</li>
              <li>Thanksgiving Break: November 25-28</li>
              <li>Midterm Exams: January 15-18</li>
              <li>Spring Break: March 20-27</li>
              <li>Final Exams: June 1-5</li>
              <li>Graduation Ceremony: June 15</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h2>Extra Curricular Activities</h2>
            <p>
              Our high school offers a wide range of exciting extra curricular
              activities to enrich your educational experience and encourage
              personal growth. Whether you're interested in sports, arts, or
              academic clubs, there's something for everyone. Participating in
              these activities is a fantastic way to make new friends, develop
              skills, and explore your passions outside the classroom.
            </p>
            <p>Some of the activities we offer include:</p>
            <ul>
              <li>Student Government</li>
              <li>Debate Club</li>
              <li>Drama Club</li>
              <li>Soccer Team</li>
              <li>Chess Club</li>
              <li>Art Workshop</li>
              <li>Science Olympiad</li>
              <li>Music Band</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
