import { AUTH_CONST } from "../../config/constent";
import {setLocalStorageItem,getLocalStorageItem} from './helper'

const persistAuthState = (state) => {
    setLocalStorageItem(AUTH_CONST.STORAGE_KEY.IS_AUTHENTICATED, state);
};
const readAuthState = () => {
    return getLocalStorageItem(AUTH_CONST.STORAGE_KEY.IS_AUTHENTICATED) || false;
};

const persistToken = (token) => {
    setLocalStorageItem(AUTH_CONST.STORAGE_KEY.ACCESS_TOKEN, token);
};

const readToken = () => {
    return getLocalStorageItem(AUTH_CONST.STORAGE_KEY.ACCESS_TOKEN);
};

const persistUser = (user) => {
    setLocalStorageItem(AUTH_CONST.STORAGE_KEY.AUTH_USER, user);
};

const readUser = () => {
    return getLocalStorageItem(AUTH_CONST.STORAGE_KEY.AUTH_USER);
};

const deleteAuthenticationInfo = () => {
    readAuthState() && localStorage.removeItem(AUTH_CONST.STORAGE_KEY.IS_AUTHENTICATED);
    readToken() && localStorage.removeItem(AUTH_CONST.STORAGE_KEY.ACCESS_TOKEN);
    readUser()&& localStorage.removeItem(AUTH_CONST.STORAGE_KEY.AUTH_USER);
};

export {persistAuthState,readAuthState,persistToken,readToken,persistUser,readUser,deleteAuthenticationInfo}