import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../config/config";
import { IPost } from "../../interfaces/posts";

export const fetchPosts = createAsyncThunk(
  "fetchPosts",
  async (userId?: string) => {
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
  }
);

export const addPost = createAsyncThunk("addPost", async (postData: any) => {
  return postData;
});

export const addComment = createAsyncThunk(
  "addComment",
  async (commentData: any) => {
    return commentData;
  }
);

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
    builder.addCase(addPost.fulfilled, (state: any, action) => {
      state.posts = [action.payload, ...state.posts];
    });
    builder.addCase(addComment.fulfilled, (state: any, action) => {
      state.posts.map((post: IPost) => {
        if (post.id === action.payload.postId) {
          post.comments = [...post.comments, action.payload];
          post.commentorsIds = [
            ...post.commentorsIds,
            action.payload.commentorId,
          ];
          return post;
        } else {
          return post;
        }
      });
    });
  },
});

export default postsSlice.reducer;
