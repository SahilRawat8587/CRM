import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        message: null,
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        removeUser: (state) => {
            state.user = null;
            state.message = null;
        },
    },
})

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;