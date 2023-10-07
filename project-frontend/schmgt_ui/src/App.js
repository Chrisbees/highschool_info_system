import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import AllStudents from "./components/students/AllStudents";
import AllStaff from "./components/staff/AllStaff";
import Header from "./components/Header/Header";
import AddStudents from "./components/students/AddStudents";
import UpdateStudents from "./components/students/UpdateStudent";
import setJWTTOken from "./securityutils/setJWTToken";
import jwtDecode from "jwt-decode";
import Store from "./app/store";
import { SET_CURRENT_USER } from "./app/ActionType";
import { logout } from "./app/SecurityActions";
import SecuredRoute from "./securityutils/SecuredRoute";
import StaffInfo from "./components/staff/StaffInfo";
import StudentInfo from "./components/students/StudentInfo";
import AddStaff from "./components/staff/AddStaff";
import UpdateStaff from "./components/staff/UpdateStaff";
import AddParents from "./components/parents/AddParents";
import Homepage from "./components/Homepage";
import StudentLogin from "./components/StudentLogin";
import StaffLogin from "./components/StaffLogin";
import ParentsLogin from "./components/ParentsLogin";
import "./App.css";
import AddCourses from "./components/courses/AddCourses";

const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJWTTOken(jwtToken);
  const decoded_jwtToken = jwtDecode(jwtToken);
  Store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    Store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Router>
      <div className="App">
        <div className="fixed-header">
          <Header />
        </div>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/parents/login" element={<ParentsLogin />} />
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/" element={<Homepage />} />

          <Route path="/*" element={<SecuredRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

function SecuredRoutes() {
  return (
    <Routes>
      <Route path="allstudents" element={<AllStudents />} />
      <Route path="allstaff" element={<AllStaff />} />
      <Route path="/staff/:id" element={<StaffInfo />} />
      <Route path="/student/:id" element={<StudentInfo />} />
      <Route path="/updatestudents/:id" element={<UpdateStudents />} />
      <Route path="/updatestaff/:id" element={<UpdateStaff />} />
      <Route path="/addstaff" element={<AddStaff />} />
      <Route path="/addstudents" element={<AddStudents />} />
      <Route path="/student/:id/addparent" element={<AddParents />} />
      <Route path="/student/:id/addcourse" element={<AddCourses />} />
    </Routes>
  );
}

export default App;
