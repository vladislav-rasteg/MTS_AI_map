import { combineReducers, configureStore } from "@reduxjs/toolkit"
import ProfileReducer from "shared/store/reducers/ProfileSlice"
import ThemeReducer from "shared/store/reducers/ThemeSlice"
import {generalApi} from "shared/api/config";


const rootReducer = combineReducers({
    [generalApi.reducerPath]: generalApi.reducer,
    ProfileReducer,
    ThemeReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(generalApi.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
