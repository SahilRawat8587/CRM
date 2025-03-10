import { API_URL } from "@/utils/constant"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

axios.defaults.withCredentials = true

export const uploadFile = createAsyncThunk(
    'file/uploadFile',
    async (FormData, { rejectWithValue }) => {
        try {
            const response = await axios.post( `${API_URL}/file/upload`, FormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || 'Error uploading file'
            )
        }
    }
)

export const deleteFile = createAsyncThunk(
    'file/deleteFile',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/file/delete/uploads/${id}`)
            return response.data
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || 'Error deleting file'
            )
        }
    }
)

export const getAllFiles = createAsyncThunk(
    'file/getAllFiles',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/file/getAllFiles`)          
            return response.data
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || 'Error getting files'
            )
        }
    }
)

export const fileSlice = createSlice({
    name: 'file',
    initialState: {
        files: [],
        status: 'idle',
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.files.push(action.payload)
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(deleteFile.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.files = state.files.filter((file) => file.public_id !== action.payload.public_id)
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(getAllFiles.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllFiles.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.files = action.payload.files
            })
            .addCase(getAllFiles.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})

export const { clearError } = fileSlice.actions
export default fileSlice.reducer