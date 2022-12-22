import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadImages = createAsyncThunk(
  "upload/images",
  async (formData, path, token) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/uploadImages`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );
      console.log(result.data)
      return result.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);
const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    loadingUpload: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadImages.pending, (state) => {
      state.loadingUpload = true;
    });
    builder.addCase(uploadImages.fulfilled, (state, action) => {
      state.loadingUpload = false;
      state.message = action.payload.message;
    });
  },
});

export default uploadSlice.reducer;
