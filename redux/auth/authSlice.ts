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

export const sendFriendRequest = createAsyncThunk(
  "sendFriendRequest",
  async (userId: string) => {
    return userId;
  }
);

export const acceptFriendRequest = createAsyncThunk(
  "acceptFriendRequest",
  async (userId: string) => {
    return userId;
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
    builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
      state.currentUser.friendRequestsSent = [
        ...state.currentUser.friendRequestsSent,
        action.payload,
      ];
    });
    builder.addCase(acceptFriendRequest.fulfilled, (state, action) => {
      state.currentUser.friendRequestsReceived = state.currentUser.friendRequestsReceived.filter(
        (id: string) => id !== action.payload
      );
      state.currentUser.friends = [
        ...state.currentUser.friends,
        action.payload,
      ];
    });
  },
});

export default authSlice.reducer;
