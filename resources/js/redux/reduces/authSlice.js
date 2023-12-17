import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "../../services/api/auth.service";
import { toast } from "react-toastify";
import { TOAST_CONST } from "../../config/constent";

import {
    persistAuthState,
    readAuthState,
    persistUser,
    readUser,
    persistToken,
    readToken,
    deleteAuthenticationInfo,
} from "../../services/storage/auth.storage";

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    user: {},
};

const setInitialAuthState = () => {
    if (readUser() && readToken() && readAuthState()) {
        initialState.isAuthenticated = readAuthState();
        initialState.accessToken = readToken();
        initialState.user = readUser();
    }
};

setInitialAuthState();

export const loginProcess = createAsyncThunk(
    "auth/login",
    async (credentials) => {
        try {
            return login(credentials)
                .then((e) => e.data)
                .catch((e) => e?.response?.data);
        } catch (error) {
            throw new Error("Something went wrong!!");
        }
    },
);

export const logoutProcess = createAsyncThunk(
    "auth/logout",
    async (credentials) => {
        try {
            return logout(credentials)
                .then((e) => e.data)
                .catch((e) => e?.response?.data);
        } catch (error) {
            throw new Error("Something went wrong!!");
        }
    },
);

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(loginProcess.fulfilled, (state, action) => {
            const { payload } = action;

            if (payload?.status === 200) {
                const { user, token } = payload?.data || {};

                user && persistUser(user);
                token && persistToken(token);
                user && token && persistAuthState(true);

                Object.assign(state, {
                    isAuthenticated: true,
                    accessToken: token,
                    user: user,
                });
            }

            payload?.errors &&
                Object.values(payload?.errors).forEach((error) =>
                    Array.isArray(error)
                        ? error.forEach((e) => toast(e, TOAST_CONST.TYPE.ERROR))
                        : toast(error, TOAST_CONST.TYPE.ERROR),
                );

            payload?.message && toast(payload?.message, TOAST_CONST.TYPE.INFO);
        });

        builder.addCase(loginProcess.rejected, (state, action) => {
            action?.error?.name &&
                toast(action?.error?.name, TOAST_CONST.TYPE.ERROR);
            action?.error?.message &&
                toast(action?.error?.message, TOAST_CONST.TYPE.ERROR);
        });

        builder.addCase(logoutProcess.fulfilled, (state, action) => {
            const { payload } = action;

            if (payload?.status === 200) {
                deleteAuthenticationInfo();
                Object.assign(state, {
                    isAuthenticated: false,
                    accessToken: null,
                    user: {},
                });
            }

            payload?.errors &&
                Object.values(payload?.errors).forEach((error) =>
                    Array.isArray(error)
                        ? error.forEach((e) => toast(e, TOAST_CONST.TYPE.ERROR))
                        : toast(error, TOAST_CONST.TYPE.ERROR),
                );

            payload?.message && toast(payload?.message, TOAST_CONST.TYPE.INFO);
        });
        builder.addCase(logoutProcess.rejected, (state, action) => {
            action?.error?.name &&
                toast(action?.error?.name, TOAST_CONST.TYPE.ERROR);
            action?.error?.message &&
                toast(action?.error?.message, TOAST_CONST.TYPE.ERROR);
        });
    },
});

export default authSlice.reducer;
