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

export const search = createAsyncThunk("search", async ({ value, token }) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/search/${value}`,
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

export const addToSearchHistory = createAsyncThunk(
  "addToSearchHistory",
  async ({ searchUser, token }) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/addToSearchHistory`,
        { searchUser },
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

export const getSearchHistory = createAsyncThunk(
  "getSearchHistory",
  async ({ token }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getSearchHistory`,
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

export const deleteSearchHistory = createAsyncThunk(
  "deleteSearchHistory",
  async ({ idUser, token }) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/deleteSearchHistory`,
        { idUser },
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

export const getInfoFriendPage = createAsyncThunk(
  "getInfoFriendPage",
  async ({ token }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getInfoFriendPage`,
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

const userSlice = createSlice({
  name: "user/profile",
  initialState: {
    profile: {},
    listImage: [],
    searchResult: [],
    searchHistory: [],
    friends: [],
    requests: [],
    sends: [],
    people: [],
    loading: false,
  },
  reducers: {
    addPostProfile: (state, action) => {
      state.profile.posts = [action.payload, ...state.profile.posts];
    },
    deletePostProfile: (state, action) => {
      state.profile.posts = state.profile.posts.filter(
        (post) => post._id !== action.payload._id
      );
    },
    updateProfileCover: (state, action) => {
      state.profile.cover = action.payload;
    },
    updateProfileAvatar: (state, action) => {
      state.profile.picture = action.payload;
      state.profile.posts = state.profile.posts.map((post) => {
        const user = { ...post.user, picture: action.payload };
        return { ...post, user: user };
      });
    },
    clearSearchResult: (state, action) => {
      state.searchResult = [];
    },
    deletePeople: (state, action) => {
      state.people = state.people.filter(
        (person) => person._id !== action.payload.id
      );
    },
  },
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

    //search

    builder.addCase(search.fulfilled, (state, action) => {
      state.searchResult = action.payload;
    });
    builder.addCase(getSearchHistory.pending, (state, action) => {
      state.searchHistory = [];
    });
    builder.addCase(getSearchHistory.fulfilled, (state, action) => {
      state.searchHistory = action.payload;
    });

    builder.addCase(deleteSearchHistory.fulfilled, (state, action) => {
      state.searchHistory = action.payload;
    });

    builder.addCase(getInfoFriendPage.fulfilled, (state, action) => {
      state.friends = action.payload.friends;
      state.requests = action.payload.requests;
      state.sends = action.payload.sends;
      state.people = action.payload.people;
    });
  },
});
export const {
  addPostProfile,
  deletePostProfile,
  updateProfileAvatar,
  updateProfileCover,
  clearSearchResult,
  deletePeople,
} = userSlice.actions;
export default userSlice.reducer;
