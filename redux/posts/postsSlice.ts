import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../config/config";

export const fetchPosts = createAsyncThunk("posts", async (userId?: string) => {
  const fetchedPosts: any = [];
  if (userId) {
    const data = await firebase
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
    data.forEach((post) => {
      const addId = { ...post.data(), id: post.id };
      fetchedPosts.push(addId);
    });
    return fetchedPosts;
  } else {
    const data = await firebase
      .firestore()
      .collection("posts")
      .orderBy("createdAt", "desc")
      .get();
    data.forEach((post) => {
      const addId = { ...post.data(), id: post.id };
      fetchedPosts.push(addId);
    });
    return fetchedPosts;
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    fetchError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
      state.fetchError = false;
    });
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.fetchError = true;
    });
  },
});

export default postsSlice.reducer;
