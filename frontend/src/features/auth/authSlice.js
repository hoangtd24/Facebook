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
  },
});
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
