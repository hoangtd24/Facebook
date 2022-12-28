import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile = createAsyncThunk(
  "getProfile",
  async (param, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${param}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getListImage = createAsyncThunk(
  "getListImage",
  async (param, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/getListImage`,
        param
      );
      return data.resources;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const userSlice = createSlice({
  name: "user/profile",
  initialState: {
    profile: {},
    listImage: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    //getprofilr
    builder.addCase(getProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
    });

    // get list image of user
    builder.addCase(getListImage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getListImage.fulfilled, (state, action) => {
      state.listImage = action.payload;
      state.loading = false;
    });
    builder.addCase(getListImage.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export default userSlice.reducer;
