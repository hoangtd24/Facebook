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

export const updateProfilePicture = createAsyncThunk(
  "updateProfilePicture",
  async ({ url, token }) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateProfilePicture`,
        { url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCoverPicture = createAsyncThunk(
  "updateCoverPicture",
  async ({ url, token }) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateCoverPicture`,
        { url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
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

    //updateProfilePicture
    builder.addCase(updateProfilePicture.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProfilePicture.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateProfilePicture.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export default userSlice.reducer;
