import {
  GET_ERRORS,
  GET_STAFF,
  GET_STAFFS,
  DELETE_STAFF,
  CREATE_STAFF,
  UPDATE_STAFF,
} from "./ActionType";
import axios from "axios";
import { PDFDocument, rgb } from "pdf-lib";
import { fetchStaffData } from "./staffSlice";
import Store from "./store";

export const createStaff = (staff, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:8001/api/v1/staff/addStaff",
      staff,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );
    navigate("/allstaff");
    dispatch({
      type: CREATE_STAFF,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getStaffs = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "http://localhost:8001/api/v1/staff/allStaffs",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );
    dispatch({
      type: GET_STAFFS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {}
};

export const getStaff = (id, navigate) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8001/api/v1/staff/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch({
      type: GET_STAFF,
      payload: res.data,
    });
    // console.log(JSON.stringify(res.data))
    return res.data;
  } catch (error) {
    navigate("/");
  }
};

export const getStaffData = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8001/api/v1/staff/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch({
      type: GET_STAFF,
      payload: res.data,
    });
    // console.log(JSON.stringify(res.data))
    return res.data;
  } catch (error) {}
};

export const updateStaff = (staffId, staff, navigate) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:8001/api/v1/staff/update/${staffId}`,
      staff,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );
    navigate("/allstaff");
    dispatch({
      type: UPDATE_STAFF,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.res,
    });
  }
};

export const deleteStaff = (id, navigate) => async (dispatch) => {
  await axios.delete(`http://localhost:8001/api/v1/staff/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    },
  });
  navigate("/allstaff");
  dispatch({
    type: DELETE_STAFF,
    payload: id,
  });
};

export const generateStaffPDF = async (staffId) => {
  try {
    const response = await axios.get(
      `http://localhost:8001/api/pdf/generate-pdf/staff/${staffId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );

    Store.dispatch(fetchStaffData(staffId));

    const staff = Store.getState().staff;
    // console.log(staff);
    // ... rest of the code to generate the PDF using staff data

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Draw text on the page

    page.drawText("Staff Information", {
      x: 50,
      y: page.getHeight() - 50,
      size: 24,
      color: rgb(0, 0, 0),
    });

    const propertiesToPrint = [
      { label: "First Name", value: staff.firstname },
      { label: "Last Name", value: staff.lastname },
      { label: "Gender", value: staff.gender },
      { label: "Email", value: staff.email },
      { label: "Date of birth", value: staff.dob },
      { label: "Nationality", value: staff.nationality },
      { label: "State Of Origin", value: staff.state },
      { label: "Ethnicity", value: staff.ethnicity },
      { label: "Home Address", value: staff.address },
      { label: "Phone Number", value: staff.phone },
      { label: "Emergency Contact", value: staff.emergency },
      { label: "Grade", value: staff.grade },
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

export const updateStaffImage = (staffId, imageFile) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("imageFile", imageFile);

    const res = await axios.put(
      `http://localhost:8001/api/v1/staff/${staffId}/updateImage`,
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
      type: UPDATE_STAFF,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
