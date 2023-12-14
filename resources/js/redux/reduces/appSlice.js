import { createSlice } from "@reduxjs/toolkit";
import {THEME_CONST} from '../../config/constent'

const initialState = {
    appName : "MILK_MILCH",
    isLoading : false,
    dashboardLayout:{
        colorScheme : THEME_CONST.COLOR_SCHEME.DARK,
        sidebar : {
            colorScheme : THEME_CONST.SEDEBAR.COLOR.DARK,
            visible : THEME_CONST.SEDEBAR.VISIBLE.ACTIVE,
            unfoldable : THEME_CONST.SEDEBAR.UNFOLDABLE.INACTIVE
        } 
    }
}

const appSlice = createSlice({
        name : 'app',
        initialState : initialState,
        reducers : {
            setLoadingState(state,action){
                state.isLoading = action.payload
            },
            toggleThemeScheme(state,action){
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
