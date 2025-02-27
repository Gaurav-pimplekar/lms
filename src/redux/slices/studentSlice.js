import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  student: null,
  loading: false,
  error: null,
  students: []
};

export const getAllstudents = createAsyncThunk("user/getstudents", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("/api/student"); // Wait for response
    console.log("user response get call", res);
    return res.data; // Return the actual data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch users"); // Handle errors
  }
});


const studentSlice = createSlice({
  name: "student",
  initialState,
  extraReducers : (builder) =>{
    builder
      .addCase(getAllstudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllstudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload; // Ensure `users` exists in API response
      })
      .addCase(getAllstudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});


export default studentSlice.reducer;
