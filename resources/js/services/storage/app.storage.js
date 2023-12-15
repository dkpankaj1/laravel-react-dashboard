import {getLocalStorageItem,setLocalStorageItem} from './helper'
import { THEME_CONST } from '../../config/constent'

const persistColorScheme = (state) =>{
    setLocalStorageItem(THEME_CONST.STORAGE_KEY.COLOR_SCHEME,state)
}
const readColorScheme = () =>{
    return getLocalStorageItem(THEME_CONST.STORAGE_KEY.COLOR_SCHEME) || THEME_CONST.COLOR_SCHEME.DARK
}

export {persistColorScheme,readColorScheme}