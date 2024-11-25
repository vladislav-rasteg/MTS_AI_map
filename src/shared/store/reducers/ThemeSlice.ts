
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IThemeState {
    theme: string
}


const initialState: IThemeState = {
    theme: "light"
}


export const themeSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateTheme(state, action: PayloadAction<string>) {
            state.theme = action.payload
        },
    },
})

export default themeSlice.reducer
