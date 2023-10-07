import {
  GET_ERRORS,
  GET_STUDENT,
  GET_STUDENTS,
  DELETE_STUDENT,
  CREATE_STUDENT,
  UPDATE_STUDENT,
} from "./ActionType";
import axios from "axios";
import setJWTTOken from "../securityutils/setJWTToken";
import { PDFDocument, rgb } from "pdf-lib";
import { fetchStudentData } from "./studentSlice";
import Store from "./store";

export const createStudent = (students, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:8001/api/v1/students/addStudent",
      students,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );
    navigate("/allstudents");
    dispatch({
      type: CREATE_STUDENT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getStudents = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "http://localhost:8001/api/v1/students/allStudents",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );
    dispatch({
      type: GET_STUDENTS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {}
};

export const getStudent = (id, navigate) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8001/api/v1/students/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });

    dispatch({
      type: GET_STUDENT,
      payload: res.data,
    });
    // console.log(JSON.stringify(res.data.id));
    return res.data;
  } catch (error) {
    navigate("/");
  }
};

export const getStudentData = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8001/api/v1/students/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch({
      type: GET_STUDENT,
      payload: res.data,
    });
    // console.log(JSON.stringify(res.data))
    return res.data;
  } catch (error) {}
};

export const updateStudent =
  (studentId, student, navigate) => async (dispatch) => {
    try {
      const res = await axios.put(
        `http://localhost:8001/api/v1/students/update/${studentId}`,
        student,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      );
      navigate(`/student/${studentId}`);
      dispatch({
        type: UPDATE_STUDENT,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.res,
      });
    }
  };

export const addParents = (studentId, parent, navigate) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:8001/api/v1/students/${studentId}/addParents`,
      parent,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );
    navigate("/allstudents");
    dispatch({
      type: UPDATE_STUDENT,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.res,
    });
  }
};

export const addCourses =
  (studentId, student, navigate) => async (dispatch) => {
    try {
      const res = await axios.put(
        `http://localhost:8001/api/v1/students/${studentId}/addCourses`,
        student,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      );
      navigate("/allstudents");
      dispatch({
        type: UPDATE_STUDENT,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.res,
      });
    }
  };

export const getStudentParent = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8001/api/v1/students/${id}/getParents`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );
    dispatch({
      type: GET_STUDENT,
      payload: res.data,
    });
    // console.log(JSON.stringify(res.data))
    return res.data;
  } catch (error) {}
};

export const getStudentCourses = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8001/api/v1/students/${id}/getCourses`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );
    dispatch({
      type: GET_STUDENT,
      payload: res.data,
    });
    // console.log(JSON.stringify(res.data))
    return res.data;
  } catch (error) {}
};

export const deleteStudent = (id, navigate) => async (dispatch) => {
  await axios.delete(`http://localhost:8001/api/v1/students/delete/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    },
  });
  navigate("/allstudents");
  dispatch({
    type: DELETE_STUDENT,
    payload: id,
  });
};

export const generateStudentPDF = async (studentId) => {
  try {
    const response = await axios.get(
      `http://localhost:8001/api/pdf/generate-pdf/${studentId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );

    Store.dispatch(fetchStudentData(studentId));

    const student = Store.getState().student;
    // console.log(student);
    // ... rest of the code to generate the PDF using student data

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Draw text on the page

    page.drawText("Student Information", {
      x: 50,
      y: page.getHeight() - 50,
      size: 24,
      color: rgb(0, 0, 0),
    });

    const propertiesToPrint = [
      { label: "First Name", value: student.firstname },
      { label: "Last Name", value: student.lastname },
      { label: "Gender", value: student.gender },
      { label: "Email", value: student.email },
      { label: "Date of birth", value: student.dob },
      { label: "Nationality", value: student.nationality },
      { label: "State Of Origin", value: student.state },
      { label: "Ethnicity", value: student.ethnicity },
      { label: "Home Address", value: student.address },
      { label: "Phone Number", value: student.phone },
      { label: "Emergency Contact", value: student.emergency },
      { label: "Grade", value: student.grade },
    ];

    const startY = page.getHeight() - 100;
    const lineHeight = 18;

    propertiesToPrint.forEach((property, index) => {
      const yPosition = startY - index * lineHeight;
      page.drawText(`${property.label}: ${property.value}`, {
        x: 50,
        y: yPosition,
        size: 18,
        color: rgb(0, 0, 0),
      });
    });

    // Save the PDF to a Uint8Array
    const pdfBytes = await pdfDoc.save();
    return pdfBytes; // Return the PDF bytes to the frontend
  } catch (error) {
    console.error("Error generating PDF:", error);
    return null;
  }
};

export const updateStudentImage =
  (studentId, imageFile) => async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("imageFile", imageFile);

      const res = await axios.put(
        `http://localhost:8001/api/v1/students/${studentId}/updateImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      );
      console.log(formData);
      dispatch({
        type: UPDATE_STUDENT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };
