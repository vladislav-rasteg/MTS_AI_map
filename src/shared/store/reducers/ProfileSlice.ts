import { jwtDecode } from 'jwt-decode';
import {profileApi} from "shared/api/ProfileAPI";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IProfileState {
    currentProfile: any
    isAuthorized: boolean
}


const initialState: IProfileState = {
    currentProfile: {} as any,
    isAuthorized: false
}


export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateCurrentLocation(state, action: PayloadAction<any>) {
            const updateCurrentLocation: any = {
                ...state.currentProfile,
                city: action.payload
            }
            state.currentProfile = updateCurrentLocation
        },
        clearCurrentProfile(state) {
            state.currentProfile = undefined
        },
    },

    extraReducers: (builder) => {
        builder.addMatcher(profileApi.endpoints.check.matchFulfilled, (state, {payload}: PayloadAction<{
            token: string
        }>) => {
            localStorage.setItem("access_token", payload.token)
            state.currentProfile = jwtDecode(payload.token)
            if(payload.token){
                state.isAuthorized = true
            }
        });
        //@ts-ignore
        builder.addMatcher(profileApi.endpoints.getSession.matchFulfilled, (state, {payload}: PayloadAction<string>) => {
            localStorage.setItem("session", payload)
        });
        builder.addMatcher(profileApi.endpoints.getUserProfile.matchFulfilled, (state, {payload}: PayloadAction<{
            token: string, isAuthorized: boolean
        }>) => {
            localStorage.setItem("access_token", payload.token)
            state.currentProfile = jwtDecode(payload.token)
            if(payload.token){
                state.isAuthorized = true
            }
        });
        builder.addMatcher(profileApi.endpoints.getUserProfile.matchRejected, (state) => {
            state.isAuthorized = false
        });
    }
})

export default profileSlice.reducer
