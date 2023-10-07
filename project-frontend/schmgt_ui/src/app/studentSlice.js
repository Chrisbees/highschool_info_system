import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudentData = createAsyncThunk(
  "student/fetchStudentData",
  async (studentId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/v1/students/${studentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudentData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default studentSlice.reducer;
