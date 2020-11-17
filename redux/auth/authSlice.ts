import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase, { auth } from "../../config/config";
import { IUser } from "../../interfaces/user";

const initialState: {
  currentUser: any;
  isLoading: boolean;
  fetchError: boolean;
} = {
  currentUser: null,
  isLoading: false,
  fetchError: false,
};

export const setCurrentUser = createAsyncThunk(
  "auth",
  async (userData: any | null) => {
    if (userData) {
      return userData;
    } else {
      return null;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.fetchError = false;
    });
    builder.addCase(setCurrentUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(setCurrentUser.rejected, (state, action) => {
      state.fetchError = true;
    });
  },
});

export default authSlice.reducer;
