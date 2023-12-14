import { createSlice } from "@reduxjs/toolkit";
import AppConstent from '../../config/constent'

const initialState = {
    appName : "MILK_MILCH",
    dashboardLayout:{
        colorScheme : AppConstent.THEMES.COLOR_SCHEME.DARK,
        sidebar : {
            colorScheme : AppConstent.THEMES.SEDEBAR.COLOR.DARK,
            visible : AppConstent.THEMES.SEDEBAR.VISIBLE.ACTIVE,
            unfoldable : AppConstent.THEMES.SEDEBAR.UNFOLDABLE.INACTIVE
        } 
    }
}

const appSlice = createSlice({
        name : 'app',
        initialState : initialState,
        reducers : {
            toggleThemeScheme(state,action){
                state.dashboardLayout.colorScheme = action.payload
            },
            toggleSidebar(state,action){
                state.dashboardLayout.sidebar.visible = action.payload
            },
            toggleUnfoldable(state,){
                state.dashboardLayout.sidebar.unfoldable = !state.dashboardLayout.sidebar.unfoldable
            }
        },
        extraReducers : (builder) => {}
})

export const {toggleThemeScheme,toggleSidebar,toggleUnfoldable} = appSlice.actions
export default appSlice.reducer
