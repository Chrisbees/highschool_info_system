import axios from "axios";
import setJWTTOken from "../securityutils/setJWTToken";
import jwtDecode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./ActionType";

export const login = (LoginRequest) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:8001/auth/v1/admin/login",
      LoginRequest
    );
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setJWTTOken(token);
    const decoded = jwtDecode(token);
    // navigate("/dashboard")
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const studentlogin = (LoginRequest) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:8001/api/v1/students/login",
      LoginRequest
    );
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setJWTTOken(token);
    const decoded = jwtDecode(token);
    // navigate("/dashboard")
    const userId = decoded.entityId; // Assuming the response data includes an "id" field
    console.log(userId);
    dispatch({
      type: SET_CURRENT_USER,
      payload: { ...decoded, userId }, // Include the userId in the payload
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const stafflogin = (LoginRequest) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:8001/api/v1/staff/login",
      LoginRequest
    );
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setJWTTOken(token);
    const decoded = jwtDecode(token);
    // navigate("/dashboard")
    const userId = decoded.entityId; // Assuming the response data includes an "id" field
    console.log(userId);
    dispatch({
      type: SET_CURRENT_USER,
      payload: { ...decoded, userId }, // Include the userId in the payload
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJWTTOken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
