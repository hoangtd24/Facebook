import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import postSlice from '../features/post/postSlice'
import uploadSlice from '../features/upload/uploadSlice'
const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        upload: uploadSlice
    }
})

export default store