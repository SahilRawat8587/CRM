import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
const store = configureStore({
    reducer: {
        // Add reducers here
        user: userSlice
    }
})

export default store;