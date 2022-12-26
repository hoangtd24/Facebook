import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import postSlice from "../features/post/postSlice";
import uploadSlice from "../features/upload/uploadSlice";
import userSlice from "../features/user/userSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    upload: uploadSlice,
    user: userSlice,
  },
});

export default store;
