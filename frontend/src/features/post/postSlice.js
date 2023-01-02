import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createPost = createAsyncThunk(
  "post/create",
  async ({ token, ...data }) => {
    try {
      const post = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/createPost`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return post.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const getAllPost = createAsyncThunk("post/getAll", async ({ token }) => {
  try {
    const post = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getAllPost`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return post.data;
  } catch (error) {
    return error.response.data.message;
  }
});
const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    message: "",
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(getAllPost.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export default postSlice.reducer;
