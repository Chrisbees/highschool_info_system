import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStaffData = createAsyncThunk(
  "staff/fetchStaffData",
  async (staffId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/v1/staff/${staffId}`,
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

const staffSlice = createSlice({
  name: "staff",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStaffData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default staffSlice.reducer;
