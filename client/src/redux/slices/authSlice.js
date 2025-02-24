import { API_URL } from '@/utils/constant';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true

export const login = createAsyncThunk(
'auth/login',
async ({ email, password }, { rejectWithValue }) => {
    try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password })
    return response.data
    } catch (error) {
    return rejectWithValue(
        error?.response?.data?.message || 'Error logging in'
    )
    }
})

export const logout = createAsyncThunk(
'auth/logout',
async (_, { rejectWithValue }) => {
    try {
    await axios.post(`${API_URL}/auth/logout`)
    return {} // No data needed on success
    } catch {
    return rejectWithValue('Error logging out')
    }
})

export const forgotPassword = createAsyncThunk(
'auth/forgot-Password',
async (email, { rejectWithValue }) => {
    try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email })
    return response.data
    } catch (error) {
    return rejectWithValue(
        error?.response?.data?.message || 'Error sending reset password email'
    )
    }
})

export const resetPassword = createAsyncThunk(
'auth/reset-Password',
async ({ token, password }, { rejectWithValue }) => {
    try {
    const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, {
        password
    })
    return response.data
    } catch (error) {
    return rejectWithValue(
        error?.response?.data?.message || 'Error resetting password'
    )
    }
})

export const checkAuth = createAsyncThunk(
'auth/check-auth',
async (_, { rejectWithValue }) => {
    try {
    const response = await axios.get(`${API_URL}/auth/check-auth`)
    return response.data
    } catch(error) {
    return rejectWithValue(
        error?.response?.data?.message || 'Error checking authentication'
    )
    }
})

const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    // If you have any synchronous actions, define them here.
    // For example, to reset your message or error, you could do:
        resetError: (state) => {
            state.error = null
        },
        resetMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        // login
        builder
        .addCase(login.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.isAuthenticated = true
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        // logout
        .addCase(logout.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(logout.fulfilled, (state) => {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        })
        .addCase(logout.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        // forgotPassword
        .addCase(forgotPassword.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
            state.isLoading = false
            state.message = action.payload.message
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        // resetPassword
        .addCase(resetPassword.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false
            state.message = action.payload.message
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        // checkAuth
        .addCase(checkAuth.pending, (state) => {
            state.isCheckingAuth = true
            state.error = null
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.isCheckingAuth = false
            state.user = action.payload.user
            state.isAuthenticated = true
        })
        .addCase(checkAuth.rejected, (state) => {
            state.isCheckingAuth = false
            state.isAuthenticated = false
        })
    }
})

export const { resetError, resetMessage } = authSlice.actions
export default authSlice.reducer