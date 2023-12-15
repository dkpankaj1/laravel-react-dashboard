export const AUTH_CONST = Object.freeze({
    STORAGE_KEY: {
        IS_AUTHENTICATED: "isAuthenticated",
        ACCESS_TOKEN: "accessToken",
        AUTH_USER: "userInfo",
    },
});

export const STATUS_CONST = Object.freeze({
    ACTIVE: true,
    INACTIVE: false,
});

export const THEME_CONST = Object.freeze({
    SIDEBAR: {
        COLOR: {
            DARK: "dark",
            LIGHT: "light",
        },
        VISIBLE: {
            ACTIVE: true,
            INACTIVE: false,
        },
        UNFOLDABLE: {
            ACTIVE: true,
            INACTIVE: false,
        },
    },
    COLOR_SCHEME: {
        AUTO: "auto",
        DARK: "dark",
        LIGHT: "light",
    },
    STORAGE_KEY:{
        COLOR_SCHEME:"colorScheme"
    }
});

export const TOAST_CONST = Object.freeze({
    TYPE: {
        SUCCESS: { type: "success" },
        ERROR: { type: "error" },
        INFO: { type: "info" },
    },
});
