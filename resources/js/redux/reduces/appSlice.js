import { createSlice } from "@reduxjs/toolkit";
import {THEME_CONST} from '../../config/constent'
import {persistColorScheme,readColorScheme} from '../../services/storage/app.storage'

const initialState = {
    appName : "MILK_MILCH",
    isLoading : false,
    dashboardLayout:{
        colorScheme : THEME_CONST.COLOR_SCHEME.DARK,
        sidebar : {
            colorScheme : THEME_CONST.SIDEBAR.COLOR.DARK,
            visible : THEME_CONST.SIDEBAR.VISIBLE.ACTIVE,
            unfoldable : THEME_CONST.SIDEBAR.UNFOLDABLE.INACTIVE
        } 
    }
}

const setInitialAppState = () => {initialState.dashboardLayout.colorScheme = readColorScheme()};

setInitialAppState();

const appSlice = createSlice({
        name : 'app',
        initialState : initialState,
        reducers : {
            setLoadingState(state,action){
                state.isLoading = action.payload
            },
            toggleThemeScheme(state,action){
                persistColorScheme(action.payload)
                state.dashboardLayout.colorScheme = action.payload
            },
            toggleSidebar(state,action){
                state.dashboardLayout.sidebar.visible = action.payload
            },
            toggleUnfoldable(state,){
                state.dashboardLayout.sidebar.unfoldable = !state.dashboardLayout.sidebar.unfoldable
            },            
        },
        extraReducers : (builder) => {}
})

export const {setLoadingState,toggleThemeScheme,toggleSidebar,toggleUnfoldable} = appSlice.actions
export default appSlice.reducer
