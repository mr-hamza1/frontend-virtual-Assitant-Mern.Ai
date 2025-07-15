import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: true,
    selectedImage: null,
    assitantNameHome: null,
    backendImage: null,
    frontendImage: null,
}

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        userExist: (state, action)=>{
            state.loading = false,
            state.user = action.payload
        },
        userNotExist: (state)=>{
            state.loading = false,
            state.user = null
        },
        userSelectedImage: (state, action)=>{
            state.selectedImage = action.payload
        },
        userAssitantName: (state, action)=>{
            state.assitantNameHome = action.payload
        },
        userBackendImage: (state, action)=>{
            state.backendImage = action.payload
        },
        userFrontendImage: (state, action)=>{
            state.frontendImage = action.payload
        },
    },
})

export const { 
    userExist,
    userNotExist, 
    userSelectedImage, 
    userAssitantName,
    userBackendImage,
    userFrontendImage,
} = userReducer.actions; 