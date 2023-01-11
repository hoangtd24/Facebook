import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (param, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        param
      );
      Cookies.set("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (param, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        param
      );
      Cookies.set("user", JSON.stringify(data));
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

export const updateDetails = createAsyncThunk(
  "updateDetails",
  async ({ infos, token }) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
        { infos },
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {},
    errorLogin: "",
    errorRegister: "",
    loading: false,
  },
  reducers: {
    logOut: (state, action) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.errorRegister = "";
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.errorRegister = action.payload.message;
      state.loading = false;
    });

    //login
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.errorLogin = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.errorLogin = action.payload.message;
      state.loading = false;
    });

    //updateProfilePicture
    builder.addCase(updateProfilePicture.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProfilePicture.fulfilled, (state, action) => {
      state.loading = false;
      state.user.picture = action.payload;
    });
    builder.addCase(updateProfilePicture.rejected, (state, action) => {
      state.loading = false;
    });
    //update cover
    builder.addCase(updateCoverPicture.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCoverPicture.fulfilled, (state, action) => {
      state.loading = false;
      state.user.cover = action.payload;
    });
    builder.addCase(updateCoverPicture.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateDetails.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});
export const { logOut, updateAvatar, updateCover } = authSlice.actions;
export default authSlice.reducer;
