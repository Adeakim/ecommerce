import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: {}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux:(state,action)=>{
            console.log(action.payload.data)
            state.user = action.payload.data
        },
        logoutRedux:(state,action) =>{
            state.user = {}
        }
    }
})

export const {loginRedux, logoutRedux} = userSlice.actions

export default userSlice.reducer