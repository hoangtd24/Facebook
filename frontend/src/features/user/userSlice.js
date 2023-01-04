import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile = createAsyncThunk(
  "getProfile",
  async ({ idUser, token }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${idUser}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error.response.data);
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

export const addFriend = createAsyncThunk(
  "addFriend",
  async ({ id, token }) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/addFriend/${id}`,
        {},
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

export const cancelRequest = createAsyncThunk(
  "cancelRequest",
  async ({ id, token }) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/cancelRequest/${id}`,
        {},
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

export const acceptRequest = createAsyncThunk(
  "acceptRequest",
  async ({ id, token }) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/acceptRequest/${id}`,
        {},
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

export const deleteRequest = createAsyncThunk(
  "deleteRequest",
  async ({ id, token }) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/deleteRequest/${id}`,
        {},
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

export const unfriend = createAsyncThunk("unfriend", async ({ id, token }) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/unfriend/${id}`,
      {},
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
});

export const follow = createAsyncThunk("follow", async ({ id, token }) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/follow/${id}`,
      {},
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
});

export const unfollow = createAsyncThunk("unfollow", async ({ id, token }) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/unfollow/${id}`,
      {},
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
});

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
      state.profile = {};
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

    builder.addCase(updateDetails.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});
export default userSlice.reducer;
