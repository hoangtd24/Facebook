import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import postSlice from "../features/post/postSlice";
import uploadSlice from "../features/upload/uploadSlice";
import userSlice from "../features/user/userSlice";
import themeSlice from "../features/theme/themeSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    upload: uploadSlice,
    user: userSlice,
    theme: themeSlice,
  },
});

export default store;
