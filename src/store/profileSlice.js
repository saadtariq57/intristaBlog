import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    profileData: null
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers:{
        setProfile: (state, action) => {
            state.status = true
            state.profileData = action.payload
        },
        unsetProfile: (state) => {
            state.status = false
            state.profileData = null
        }
    }
})

export const {setProfile, unsetProfile} = profileSlice.actions
export default profileSlice.reducer