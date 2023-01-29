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

export const deletePost = createAsyncThunk(
  "post/delete",
  async ({ token, id }) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/deletePost/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const reactPost = createAsyncThunk(
  "post/react",
  async ({ token, ...data }) => {
    try {
      const post = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/reactPost`,
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

export const unreactPost = createAsyncThunk(
  "post/unreact",
  async ({ token, ...data }) => {
    try {
      const post = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/unreactPost`,
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

export const getReacts = createAsyncThunk(
  "post/getReacts",
  async ({ token, postId }) => {
    try {
      const post = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getReacts/${postId}`,
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

export const comment = createAsyncThunk(
  "post/comment",
  async ({ token, ...data }) => {
    try {
      const comment = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/comment`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return comment.data;
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

export const getPost = createAsyncThunk(
  "post/getPost",
  async ({ id, token }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getPost/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);
const postSlice = createSlice({
  name: "post",
  initialState: {
    loadingPost: false,
    loading: false,
    message: "",
    posts: [],
    post: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.posts = [action.payload.post, ...state.posts];
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    });

    builder.addCase(getAllPost.pending, (state, action) => {
      state.loadingPost = true;
      state.posts = action.payload;
    });

    builder.addCase(getAllPost.fulfilled, (state, action) => {
      state.loadingPost = false;
      state.posts = action.payload;
    });

    builder.addCase(getPost.fulfilled, (state, action) => {
      state.post = action.payload;
    });
  },
});

export default postSlice.reducer;
